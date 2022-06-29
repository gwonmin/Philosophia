import torch
import numpy as np
import pandas as pd
import torch.nn.functional as F
import string
import flask

from flask import Flask, request
from tqdm import trange
from transformers import GPT2LMHeadModel, GPT2Tokenizer, BertForSequenceClassification, BertTokenizer
from keras_preprocessing.sequence import pad_sequences
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})


#----------------------------------------------------------------
#1. GPT2 문장 생성 모델

#Get the tokenizer and model
model = GPT2LMHeadModel.from_pretrained('gpt2')
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

#load models
model.load_state_dict(torch.load('./model.pt', map_location=torch.device('cpu')))

#Function to generate word
def generate(
    model,
    tokenizer,
    prompt,
    entry_count=10,
    entry_length=150, #maximum number of words
    top_p=0.8,
    temperature=1.,
):
    model.eval()
    generated_num = 0
    generated_list = []

    filter_value = -float("Inf")

    with torch.no_grad():

        for entry_idx in trange(entry_count):

            entry_finished = False
            generated = torch.tensor(tokenizer.encode(prompt)).unsqueeze(0)

            for i in range(entry_length):
                outputs = model(generated, labels=generated)
                loss, logits = outputs[:2]
                logits = logits[:, -1, :] / (temperature if temperature > 0 else 1.0)

                sorted_logits, sorted_indices = torch.sort(logits, descending=True)
                cumulative_probs = torch.cumsum(F.softmax(sorted_logits, dim=-1), dim=-1)

                sorted_indices_to_remove = cumulative_probs > top_p
                sorted_indices_to_remove[..., 1:] = sorted_indices_to_remove[
                    ..., :-1
                ].clone()
                sorted_indices_to_remove[..., 0] = 0

                indices_to_remove = sorted_indices[sorted_indices_to_remove]
                logits[:, indices_to_remove] = filter_value

                next_token = torch.multinomial(F.softmax(logits, dim=-1), num_samples=1)
                generated = torch.cat((generated, next_token), dim=1)

                if next_token in tokenizer.encode("<|endoftext|>"):
                    entry_finished = True

                if entry_finished:

                    generated_num = generated_num + 1

                    output_list = list(generated.squeeze().numpy())
                    output_text = tokenizer.decode(output_list)
                    generated_list.append(output_text)
                    break
            
            if not entry_finished:
              output_list = list(generated.squeeze().numpy())
              output_text = f"{tokenizer.decode(output_list)}<|endoftext|>" 
              generated_list.append(output_text)
                
    return generated_list


@app.route('/inference', methods=['POST'])
#Function to generate multiple sentences. data should be a dataframe
def text_generation():
  req_data = request.json
  
  #generate 함수 입력 형식에 맞게 pandas DataFrame으로 변경
  data = pd.DataFrame(data=[req_data['content']], index=range(0,1), columns=['0'])
  
  #문장 생성
  generated = []
  for i in range(len(data)):
    x = generate(model.to('cpu'), tokenizer, data['0'][i], entry_count=1)
    generated.append(x)

  #개행문자 제거
  result = str(generated[0]).replace("\n", "")
  #특수문자 제거
  result = result.translate(str.maketrans('', '', string.punctuation))
  #endoftext 제거
  result = result.replace("endoftext", "")

  #CORS 설정
  result = flask.Response(result)
  result.headers["Access-Control-Allow-Origin"] = "*"
  return result


#----------------------------------------------------------------
#2. BERT 비속어 Classification 모델

#Get the tokenizer and model
model_hate = BertForSequenceClassification.from_pretrained("bert-base-multilingual-cased", num_labels=2)
tokenizer_hate = BertTokenizer.from_pretrained('bert-base-multilingual-cased', do_lower_case=False)

#load models
model_hate.load_state_dict(torch.load('./hate.pt', map_location=torch.device('cpu')))

# 입력 데이터 변환
def convert_input_data(sentences):

    # BERT의 토크나이저로 문장을 토큰으로 분리
    tokenized_texts = [tokenizer_hate.tokenize(sent) for sent in sentences]

    # 입력 토큰의 최대 시퀀스 길이
    MAX_LEN = 128

    # 토큰을 숫자 인덱스로 변환
    input_ids = [tokenizer_hate.convert_tokens_to_ids(x) for x in tokenized_texts]
    
    # 문장을 MAX_LEN 길이에 맞게 자르고, 모자란 부분을 패딩 0으로 채움
    input_ids = pad_sequences(input_ids, maxlen=MAX_LEN, dtype="long", truncating="post", padding="post")

    # 어텐션 마스크 초기화
    attention_masks = []

    # 어텐션 마스크를 패딩이 아니면 1, 패딩이면 0으로 설정
    # 패딩 부분은 BERT 모델에서 어텐션을 수행하지 않아 속도 향상
    for seq in input_ids:
        seq_mask = [float(i>0) for i in seq]
        attention_masks.append(seq_mask)

    # 데이터를 파이토치의 텐서로 변환
    inputs = torch.tensor(input_ids)
    masks = torch.tensor(attention_masks)

    return inputs, masks

@app.route('/checkcomment', methods=['POST'])
# 문장 테스트
def test_sentences():
    req_data = request.json

    # 평가모드로 변경
    model_hate.eval()

    # 문장을 입력 데이터로 변환
    inputs, masks = convert_input_data([req_data['word']])

    # 그래디언트 계산 안함
    with torch.no_grad():     
        # Forward 수행
        outputs = model_hate(inputs, 
                        token_type_ids=None, 
                        attention_mask=masks)

    # 출력 로짓 구함
    logits = outputs[0]
    result = str(int(np.argmax(logits)))

    #CORS 설정
    result = flask.Response(result) #result는 iterable 해야함 / **type(result) == str
    result.headers["Access-Control-Allow-Origin"] = "*"
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,threaded = False)