import torch
import numpy as np
import pandas as pd
import torch.nn.functional as F
import string
import flask

from flask import Flask, request
from tqdm import trange
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

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
  data = pd.DataFrame(data=[req_data], index=range(0,1), columns=['0'])
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,threaded = False)