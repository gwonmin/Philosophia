import { Router } from "express";
import { registerValidation, loginValidation } from "../middlewares/validation";
import { userService } from "../services/userService";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";
import { smtpTransport } from "../config/email";
import bcrypt from "bcrypt";
import { Auth } from "../db/models/Auth";
import upload from '../modules/multer';
import { dataService } from "../services/dataService";
import { devateService } from "../services/devateService";
import { freetopicService } from "../services/freetopicService";
import { philosopherService } from "../services/philosopherService";
import { shareService } from "../services/shareService";

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
    const userId = req.user;
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

userRouter.put("/user/:userId", async function (req, res, next) {
  try {

    const uploadSingle = upload.single('image');
    uploadSingle(req, res, async error => {
      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }

    const userId = req.params.userId;
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;
    const name = req.body.name ?? null;
    let image = null;
    if (req.file) {
      image = req.file.location;
    }

    const toUpdate = { name, email, password, image };

    const updatedUser = await userService.setUser({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }
    res.status(200).json(updatedUser);
  });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/user/:userId", verifyToken, async function (req, res, next) {
  try {
    const userId = req.params.userid;

    await userService.deleteUser({ userId });

    res.send("status : success");
  } catch (error) {
    next(error);
  }
});

// 내가 쓴 게시물 조회
userRouter.get("/user/mypost", verifyToken, async function (req, res, next){
  try{
    const userId = req.user;
    const dataPost = await dataService.getPostInfoByUserId({ userId });
    const devatePost = await devateService.getPostInfoByUserId({ userId });
    const freetopicPost = await freetopicService.getPostInfoByUserId({ userId });
    const philosopherPost = await philosopherService.getPostInfoByUserId({ userId });
    const sharePost = await shareService.getPostInfoByUserId({ userId });

    res.status(200).send({ dataPost, devatePost, freetopicPost, philosopherPost, sharePost });
  } catch(error) {
    next(error);
  }
})

// 이메일 인증(인증번호 전송)
userRouter.post("/user/send-email", async function (req, res, next){
  try{
    const authNum = Math.random().toString().substring(2,6);
    const hashedAuthNum = await bcrypt.hash(authNum, 10);

    //db에 사용자가 입력한 이메일과 암호화된 인증 번호 저장
    const email = req.body.email;
    const newAuth = { email, hashedAuthNum }
    const addAuthNum = await Auth.addAuth(newAuth)

    const mailOptions = await smtpTransport.sendMail({
      from: {
        name: "필로소피아(philosophia)",
        address: "jjs_0211_@naver.com"
      },
      to: req.body.email,
      subject: '회원가입을 위한 인증번호를 입력해주세요.',
      text: "오른쪽 숫자를 입력해주세요 : " + authNum,
    });
    await smtpTransport.sendMail(mailOptions, function (error, responses) {
      if(error) {
        console.log(error);
      } else{
        console.log('success');
      }
      smtpTransport.close();
    });
    res.send("success");
    
  } catch (error){
    next(error);
  }
});

// 이메일 인증(인증번호 확인)
userRouter.post("/user/email-auth", async function(req, res, next){
  const userAuthNum = req.body.userAuthNum;

  const email = req.body.email;
  const auth = await Auth.findByEmail({ email });
  console.log('hasedAuthNum: ', auth.hashedAuthNum)
  const hashedAuthNum = auth.hashedAuthNum;

  try {
    const isAuthCorrect = await bcrypt.compare(
      userAuthNum,
      hashedAuthNum
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
