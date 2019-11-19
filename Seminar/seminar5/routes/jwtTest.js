const express = require('express');
const router = express.Router();

const jwt = require('../module/jwt'); // jsonwebtoken 모듈을 쓰는 게 아니라 module 안의 jwt 모듈을 사용하는 것

// 미들웨어
// 0.
const { LoggedIn } = require('../module/util/authUtils');
// 1. const LoggedIn = require('../module/util/authUtils').LoggedIn;
// 2. const authUtil = require('../module/util/authUtils');
//    const LoggedIn = authUtil.LoggedIn;
// 이 위 1, 2, 3 코드는 다 같다.
const util = require('../module/util/utils');
const statusCode = require('../module/util/statusCode');
const resMessage = require('../module/util/responseMessage');

router.post('/publish', (req, res) => {
    const {
        idx,
        grade,
        name
    } = req.body; // idx, grade, name을 사용자로부터 받는다.

    // null value 체크
    if (!idx || !grade || !name) {
        res.send("check value");
    } else {
        const accessToken = jwt.sign({
            idx,
            grade,
            name
        });
        res.json(accessToken); // token과 refreshToken이 accessToken에 담겨 result로 간다.
    }
});

// 토큰 해독
router.post('/verify', (req, res) => {
    const {
        token
    } = req.headers;
    const result = jwt.verify(token);
    if (result == -1) {
        return res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.EXPIRED_TOKEN));
    }
    if (result == -2) {
        return res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.INVALID_TOKEN));
    }
    res.json(result);
});

// 토큰 재발급
// router.post('/refresh', (req, res) => {
//     //헤더로 보낼경우 대소문자 구분이 안됩니다. 직접 확인해보시면 더 조아요~
//     const refreshToken = req.headers.refreshtoken;

//     //DB에서 해당 refreshToken을 가진 User를 찾음
//     //찾은 유저라고 가정
//     const selectUser = {
//         idx: 1,
//         grade: 1,
//         id: "genie",
//         name: "genie"
//     };

//     const newAccessToken = jwt.refresh(selectUser);
//     res.status(statusCode.OK).send(util.successTrue(resMessage.REFRESH_TOKEN, newAccessToken));
// });

router.use('/middleware', LoggedIn);
router.post('/middleware', (req, res) => {
    console.log(req.decoded);
    res.json(req.decoded);
});

module.exports = router;

// multipart formdata는 모두 텍스트로 간다. -> int형이나 이런거 다 파싱해줘야 함
