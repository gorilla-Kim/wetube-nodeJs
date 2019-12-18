// require : 해당 모듈을 어디선가에서 가져오는 겁니다.
// const express = require('express')
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {localMiddleware} from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
 
const app = express();


/**********************************************/
/*                   미들웨어                 */
/*********************************************/
app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(morgan("dev"));
app.use(localMiddleware);

/**********************************************/
/*                   Router                  */
/*********************************************/
app.use(routes.home, globalRouter)
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;