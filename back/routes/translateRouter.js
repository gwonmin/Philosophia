import { Router } from "express";
import { TranslateModel } from "../db/schemas/translate";
import axios from "axios";

const translateRouter = Router();

var clientId = "cWXKKLuZac0rDz5TV7Ge";
var clientSecret = "erjOvXikVv";


translateRouter.post("/translate", async function (req, res) {
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";
  var request = require("request");

  // let body = req.body;
  // const word = body.text;

  // const GPTResult = (callback)=>{
  //     const options = {
  //         method: 'POST',
  //         uri: "http://127.0.0.1:5000/inference",
  //         qs: {
  //           word: word
  //         }
  //     }

  //     request(options, function (err, res, body) {
  //         callback(undefined, {
  //             result:body
  //         });
  //     });
  // }

  // GPTResult((err, {result}={})=>{
  //     if(err){
  //         console.log("error!!!!");
  //         res.send({
  //             message: "fail",
  //             status: "fail"
  //         });
  //     }
  //     let json = JSON.parse(result);
  //     res.send({
  //         message: "from flask",
  //         status: "success",
  //         data:{
  //             json
  //         }
  //     });
  // })

  const { text } = await axios.post("http://127.0.0.1:5000/inference", {
    content: JSON.stringify(req.body),
  });
  var options = {
    url: api_url,
    form: { source: "en", target: "ko", text: text },
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
    afterText: {},
  };

  function makeText(content) {
    for (let i = content.length; i > 0; i--) {
      if (content[i] == ".") {
        content = content.substr(0, i + 1);
        content = content.replace(
          /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F,. ]/gi,
          ""
        );
        return content;
        break;
      }
    }
  }

  request.post(options, async function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
      const a = JSON.parse(response.body);
      const content = a.message.result.translatedText;
      const text = options.form.text;
      const afterText = makeText(content);
      const createdNewText = await TranslateModel.create({ text, afterText });
      return createdNewText;
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

export { translateRouter };
