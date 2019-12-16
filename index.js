// require : 해당 모듈을 어디선가에서 가져오는 겁니다.
// const express = require('express')
import express from "express";
const app = express();
const PORT = 4000; 


const handleListening = () => {
    console.log(`Listening on : http://localhost:${PORT}`);
}

const handleHome = (req, res) => {
    // console.log(req);
    res.send("welcome to the home!!")
}

const betweenHome = (req, res, next) => {
    console.log("middle ware test!!");
    next();
}

const handleProfile = (req, res) => {
    res.send("You are my profile");
}

// app.use 는 작성하는 위치가 중요하다.
app.use(betweenHome);

app.get("/", handleHome);
app.get("/profile", handleProfile);


app.listen(PORT, handleListening);