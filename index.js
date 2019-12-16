// require : 해당 모듈을 어디선가에서 가져오는 겁니다.
// const express = require('express')
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000; 



const handleListening = () => {
    console.log(`Listening on : http://localhost:${PORT}`);
}

const handleHome = (req, res) => {
    // console.log(req);
    res.send("welcome to the home!!")
}

const handleProfile = (req, res) => {
    res.send("You are my profile");
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/profile", handleProfile);


app.listen(PORT, handleListening);