import { Router } from "express";
import { registerValidation, loginValidation } from "../middlewares/validation";
import { userService } from "../services/userService";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";
import { smtpTransport } from "../config/email";
import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.post("/user/register", registerValidation, async function (req, res, next) {
    try {
      const { email, password, name } = req.body;
      
      const newUser = await userService.addUser({ email, password, name });
      
      if (newUser.errorMessage) {
        throw new Error(newUser.errorMessage);
        // return res.status(400).json({
        //   status: "error",
        //   error: newUser.errorMessage,
        // });
      }

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/user/login",
  loginValidation,
  async function (req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const { email, password } = req.body;

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userService.getUser({ email, password });

      if (user.errorMessage) {
        // throw new Error(user.errorMessage);
        return res.status(400).json({
          status: "error",
          error: user.errorMessage,
        });
      }

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/user/current", verifyToken, async function (req, res, next) {
  try {
    const userId = req.userId;
    const user = await userService.getUserInfo({
      userId,
    });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/user/:userId", verifyToken, async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const name = req.body.name ?? null;
    const toUpdate = { name, email, password, description, visited };

    const updatedUser = await userService.setUser({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/user/userId", verifyToken, async function (req, res, next) {
  try {
    const userId = req.params.userid;

    await userService.deleteUser({ userId });

    res.send("status : success");
  } catch (error) {
    next(error);
  }
});

// 이메일 인증(인증번호 전송)
userRouter.post("/user/send-email", async function (req, res, next){
  try{
    const authNum = Math.random().toString().substring(2,6);
    const hashAuthNum = await bcrypt.hash(authNum, 10);
    res.cookie('hashAuthNum', hashAuthNum, {maxAge: 300000});
    const mailOptions = await smtpTransport.sendMail({
      from: {
        name: "필로소피아(philosophia)",
        address: "jjs_0211_@naver.com"
      },
      to: req.body.email,
      subject: '회원가입을 위한 인증번호를 입력해주세요.',
      text: "오른쪽 숫자를 입력해주세요 : " + authNum,
    });
    smtpTransport.sendMail(mailOptions, function (error, responses) {
      console.log("success")
      smtpTransport.close()
  });
  } catch (error){
    next(error);
  }
});

// 이메일 인증(인증번호 확인)
userRouter.post("/user/email-auth", async function(req, res, next){
  const userAuthNum = req.body.userAuthNum;
  const hashAuthNum = req.cookies.hashAuthNum;

  try {
    const isAuthCorrect = await bcrypt.compare(
      userAuthNum,
      hashAuthNum
    );
    if(isAuthCorrect) {
      res.send({ result : 'success' });
    }
    else {
      res.send({ result : 'fail' });
    }
  } catch(err) {
    next(err);
  }
})

/* access token을 재발급 하기 위한 router.
  access token과 refresh token을 둘 다 헤더에 담아서 요청해야함 */
userRouter.get("/refresh", verifyRefresh);

export { userRouter };
