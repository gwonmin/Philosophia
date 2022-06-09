import { Router } from "express";
import { registerValidation, loginValidation } from "../middlewares/validation";
import { userService } from "../services/userService";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";

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

/* access token을 재발급 하기 위한 router.
  access token과 refresh token을 둘 다 헤더에 담아서 요청해야함 */
userRouter.get("/refresh", verifyRefresh);

export { userRouter };
