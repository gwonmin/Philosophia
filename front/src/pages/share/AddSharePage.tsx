import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import axios from "axios";

import Header from "../../components/organisms/Header";
import * as Api from "../../api";
import { TextFieldAtom } from "../../components/atoms/textInputs";

export default function AddSharePage(aiShare: any) {
  const navigate = useNavigate();

  const shareInfo = {
    philosopher: "헤겔",
    subject: "철학",
    content:
      "철학, 학문에 대한 학문. 철학이 학문에 대한 학문이기에 철학의 의무는 다른 학문들(그리고 동시에 철학)의 시작과 끝에 대해 밝히는 것이다. 어떤 지식이 다른 지식을 정당화하는 것은 합리적이다. 하지만 그렇다면, 지식의 정당화하는 지식들을 모두 정당화하는 지식은 무엇인가? 철학은 지식의 반석, 상아탑의 가장 아래 상아, 모든 관념들의 뿌리와, 그 종착지를 밝혀야 한다. 그러나 정녕 모든 시작들의 시작이 존재할 수 있는가? 시작이 내용을 가지고 있는 이상 그것은 모든 것들의 시작이 될 수 없다. 시작이 내용을 갖고 있다면 그것은 다른 무언가에 의해 그 내용이 참인지 거짓인지 재판받아야 마땅하다. 그러나 그것이 정말 최초라면 그것이 무엇에게 재판받는다는 말인가? 재판 받지 못한다는 것을 인저안다면 참인지 거짓인지 모르는 내용 따위가 우리에게 어떤 의미가 있단 말인가? 내용이 있는 것은 불완전하다. 따라서 시작은 내용을 가지지 않는 형식으로서의 순수한 시작이어야만 한다. 형식으로의 시작에서 출발하여 그것의 결과가 시작을 시작이었노라 정의내린다. 이것이 철학과 모든 학문의 시작이며 철학은 형식적 시작에서 그것이 나아가는 과정을 관찰하는 학문이다.",
  };
  const [word, setWord] = useState("");

  const connectAI = async () => {
    const serverUrl = "http://127.0.0.1:5000/inference";
    const bodyData = JSON.stringify(word);
    console.log(`%cPOST 요청: ${serverUrl}`, "color: #296aba;");
    console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

    let result = axios.post(serverUrl, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
    console.log(result);
  };

  const postShare = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: "shares",
        data: shareInfo,
      });

      navigate(-1);
    } catch (err) {
      console.log("등록에 실패하였습니다.\n", err);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Header />
        <p>글 공유 페이지입니다.</p>
        <p>제시어를 입력하세요.</p>
        <TextFieldAtom
          id="subjecy"
          label="subject"
          name="subject"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button onClick={connectAI}>토론 등록하기</button>
        <p>
          철학자 {shareInfo.philosopher}이(가) 생각하는 {shareInfo.subject}이란?
        </p>
        <p>본문: {shareInfo.content}</p>
        <button onClick={postShare}>공유하기</button>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          취소
        </button>
      </Container>
    </div>
  );
}
