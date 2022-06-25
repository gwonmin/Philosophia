import { Router } from 'express';

const translateRouter = Router();

var clientId = 'cWXKKLuZac0rDz5TV7Ge';
var clientSecret = 'erjOvXikVv';

translateRouter.post('/translate', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var request = require('request');
    const { text } = req.body;
    var options = {
        url: api_url,
        form: {'source':'en', 'target':'ko', 'text':text},
        headers: {'X-Naver-Client-Id':clientId, 'X-Naver-Client-Secret': clientSecret}
     };
    
    // var content = options.form.text;

    // for (let i = content.length; i > 0; i--) {
    //   if (content[i] == '.') {
    //     content = content.substr(0, i+1);
    //     content = content.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F,.]/gi,"")
    //     console.log(content)
    //     break;
        
    //   }
    //     }
  
    


    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
        console.log(response.body)
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });

   
  });

  


export {translateRouter};