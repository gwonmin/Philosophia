import { Router } from 'express';

const translateRouter = Router();

var clientId = 'cWXKKLuZac0rDz5TV7Ge';
var clientSecret = 'erjOvXikVv';
// var query = "hi";

translateRouter.get('/translate/:text', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    var request = require('request');
    const text = req.params.text;
    var options = {
        url: api_url,
        form: {'source':'en', 'target':'ko', 'text':text},
        headers: {'X-Naver-Client-Id':clientId, 'X-Naver-Client-Secret': clientSecret}
     };
    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  });


export {translateRouter};