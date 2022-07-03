import { Router } from "express";
import { TranslateModel } from "../db/schemas/translate";
import { Translate } from "../db/models/Translate"
import axios from "axios";

const translateRouter = Router();

var clientId = "cWXKKLuZac0rDz5TV7Ge";
var clientSecret = "erjOvXikVv";

translateRouter.post("/translate", async function (req, res) {
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";
  var request = require("request");
  
  await axios.post("http://127.0.0.1:5000/inference", {
    content: JSON.stringify(req.body.data),
  }).then(function (response) {
    // response  
    function eliminateName(text) {
      if (text.startsWith("Nietzsche")) {
        text = text.replace("Nietzsche", "");
        return text;
      } else if (text.startsWith("Kant")) {
        text = text.replace("Kant", "");
        return text;
      } else if (text.startsWith("Aristotle")) {
        text = text.replace("Aristotle", "");
        return text;
      } else {
        return text;
      }
    }
    
    let text = response.data;
    text = eliminateName(text);

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
        // res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
        // res.end(body);
        const translated = JSON.parse(response.body);
        const content = translated.message.result.translatedText;

        const text = options.form.text;
        const afterText = makeText(content);
        const createdNewText = await Translate.create({ text, afterText });
        res.json(createdNewText.afterText);

      } else {
        // res.status(response.statusCode).end();
        console.log("변역기 API 사용량 초과" + response.statusCode);
        const text = options.form.text;
        const createdOnlyText = await Translate.createOnlyText({ text });
        res.json(createdOnlyText.text);

      }
    });
  }).catch(function (error) {
    console.log(error)
  });
});

// translateRouter.get("/translate", async function (req, res, next) {
//   // const text = req.query.text;
//   // const translatedText = await TranslateModel.findOne({ text });
//   // res.status(200).json(translatedText);
//   // console.log(translatedText.afterText);
//   // return translatedText.afterText;
//     try { 
//       const translatedText = await TranslateModel.findOne().sort({ createdAt: -1 });
//       res.status(200).json(translatedText);
//       console.log(translatedText.afterText)
//       return translatedText.afterText;
      
//     } catch (error) {
//       next(error);
//     }
// })

export { translateRouter };
