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



### Serialization

니콜라스 : 어떤 정보를 쿠키에게 주는가



## 💻 Utils

### eslLint 설치하기

**한글설명 사이트 링크**

*  <https://velog.io/@velopert/eslint-and-prettier-in-react>

**기타 방법**

* way I solve the problem. when eslint global doesnt work

1. remove if you installed eslint globally  $ npm uninstall eslint -g

2. install  eslint extension on vscode
  https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

3. install 3 packages manually, not by command on eslint installed globally, 
  $ yarn add eslint-config-airbnb-base eslint eslint-plugin-import

4. make .eslintrc.js file and copy paste codes below
  module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {}
  };

5. install eslint-config-prettier $yarn add eslint-config-prettier

6. go to .eslintrc.js file and change "extends" from   "airbnb-base", to ["airbnb-base", "prettier"],

7. go to app.js and try save by ctrl+s  then you will see red lines if eslint activates succesfully