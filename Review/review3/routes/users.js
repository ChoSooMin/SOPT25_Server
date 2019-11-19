const express = require('express');
const router = express.Router();

const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const User = require('../model/user');

/**
 * 로그인
 */
router.post('/signin', (req, res) => {
  const {
    id,
    pwd
  } = req.body; // 클라이언트가 보낸 request의 body에서 가져온 값
  console.log(id, pwd);

  /**
   * TODO 1) 파라미터 값 체크
   */
  if (!id || !pwd) { // id 나 pwd 값이 없을 경우
    res.status(statusCode.BAD_REQUEST)
      .send(authUtil.successFalse(responseMessage.NULL_VALUE));

    return;
  }

  /**
   * User 모듈을 사용하여 로그인
   */
  User.signin(id, pwd)
    .then(({code, json}) => { res.status(code).send(json) })
    .catch(err => {
      console.log(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/**
 * 회원가입
 */
router.post('/signup', (req, res) => {
  const {
    id,
    pwd,
    name,
    phone
  } = req.body; // 클라이언트가 보낸 request의 body에서 값을 가져온다.
  console.log(id, pwd, name, phone);

  /**
   * TODO 1) 파라미터 값 체크
   */
  if (!id || !pwd || !name || !phone) {
    res.status(statusCode.BAD_REQUEST)
      .send(authUtil.successFalse(responseMessage.NULL_VALUE));

    return;
  }

  /**
   * User 모듈을 사용하여 회원가입
   */
  User.signup(id, pwd, name, phone)
    .then(({code, json}) => { res.status(code).send(json) })
    .catch(err => {
      console.log(err);
      res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;
