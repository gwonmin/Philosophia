const mongoose = require('mongoose');

import { User } from "./models/User";
import { Token } from "./models/Token";
import { Devate } from "./models/Devate"
import { DevateComment } from "./models/DevateComment";
<<<<<<< HEAD
import { Share } from "./models/Share";
=======
import { Philosopher } from "./models/Philosopher";
import { PhilosopherComment } from "./models/PhilosopherComment";
>>>>>>> c57265b50be1a54453876c32ab47cc037f80869c

// import dotenv from "dotenv";
// dotenv.config();

// const DB_URL = process.env.MONGODB_URL;
// //   process.env.MONGODB_URL ||
// //   "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";
// console.log("DB_URL: ", DB_URL);

// mongoose.connect(DB_URL);
// const db = mongoose.connection;

// db.on("connected", () =>
//   console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
// );
// db.on("error", (error) =>
//   console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
// );

<<<<<<< HEAD
export { User, Token, Devate, DevateComment, Share };
=======

export { User, Token, Devate, DevateComment, Philosopher, PhilosopherComment };

>>>>>>> c57265b50be1a54453876c32ab47cc037f80869c
