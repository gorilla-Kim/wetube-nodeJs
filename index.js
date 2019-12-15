// require : 해당 모듈을 어디선가에서 가져오는 겁니다.
const express = require('express')
const app = express()
const PORT = 4000; 


const handleListening = () => {
    console.log(`Listening on : http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);