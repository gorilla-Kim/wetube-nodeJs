// require : 해당 모듈을 어디선가에서 가져오는 겁니다.
// const express = require('express')
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import {localMiddleware} from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";
import dotenv from "dotenv";
 
dotenv.config();

const app = express();

const CokieStore = MongoStore(session);

/**********************************************/
/*                   미들웨어                 */
/*********************************************/
app.use(helmet());
app.set("view engine", "pug");
// 만약 /uploads url 패턴으로 접근시 uploads 서버의 폴더로 접근하게 한다.
app.use("/uploads", express.static("uploads"))
app.use("/static", express.static("static"))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("dev"));
app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new CokieStore({mongooseConnection: mongoose.connection})
    })
  );
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

/**********************************************/
/*                   Router                  */
/*********************************************/
app.use(routes.home, globalRouter)
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;