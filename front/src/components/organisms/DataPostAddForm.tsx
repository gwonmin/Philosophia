import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import * as Api from "../../api";
import axios from "axios";
import { TextFieldAtom } from "../atoms/textInputs";

import { handleChange } from "../../util";
import { ROUTES } from "../../route/Routes";

export default function DataPostAddForm() {
  const path = ROUTES.DATA;
  console.log(path);
  const [postInfo, setPostInfo] = useState({
    title: "",
    content: "",
    filePath: "",
  });
  const navigate = useNavigate();

  const onChange = (e: any) =>
    handleChange({ event: e, someState: postInfo, setSomeState: setPostInfo });
  const handlePost = async () => {
    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post({
        endpoint: path.DEFAULT.path,
        data: postInfo,
      });
      console.log(path, "의 post요청이 성공했습니다. data: ", res.data);
      navigate(-1);
    } catch (err) {
      console.log("게시글 등록에 실패하였습니다.\n", err);
    }
  };

  const dataEndpoint = path.DEFAULT.path + "/uploadfile";

  const handleFile = async (e: any) => {
    postInfo.filePath = e.target.value;
    const formData = new FormData();
    formData.append("data_file", e.target.files[0]);
    try {
      const res = await Api.post({
        endpoint: dataEndpoint,
        data: formData,
      });
      console.log("파일 업로드 성공");
    } catch (err) {
      console.log("파일 업로드 실패", err);
    }
  };

  return (
    <>
      <TextFieldAtom
        id="title"
        label="title"
        name="title"
        value={postInfo.title}
        onChange={onChange}
      />
      <TextFieldAtom
        id="content"
        label="content"
        name="content"
        value={postInfo.content}
        onChange={onChange}
      />
      <form encType="multipart/form-data">
        <input
          onChange={handleFile}
          type="file"
          accept="application/msword, text/plain, application/pdf, image/*"
        />
      </form>
      <button onClick={handlePost}>게시글 등록하기</button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        취소
      </button>
    </>
  );
}
