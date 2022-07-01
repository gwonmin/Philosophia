import axios from "axios";

const checkComment = async function (req, res, next) {
  try {
    await axios.post("http://127.0.0.1:5000/checkcomment", {
        content: JSON.stringify(req.body),
      }).then(function (response) {
        // 1이면 비속어
        const text = response.data

        if (text == '1') {
            req.body = {
                content: JSON.stringify("비속어가 포함된 댓글입니다."),
              }
            next();
        } else {
            next();
        }
      })

  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: "req.body 값을 확인 해보세요",
      error,
    });
    next(error);
  }
};

export { checkComment };
