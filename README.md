# wetube-nodeJs

## 1 Day

### 📒 Express

* 외부 모듈 가져오기(express 가져오기)

```javascript
// require : 해당 모듈을 어디선가에서 가져오는 겁니다.
const express = require('express')
// 실행한 express 앱 만들기
const app = express()
```

* request, response 다루는 함수 만들기

```javascript
const handleHome = (req, res) => {
    // console.log(req);
    res.send("welcome to the home!!")
}

const handleProfile = (req, res) => {
    res.send("You are my profile");
}
```

* listener 만들기

```javascript
app.listen(PORT, handleListening);
```

* router 만들기

```javascript
app.get("/", handleHome);
app.get("/profile", handleProfile);
```

