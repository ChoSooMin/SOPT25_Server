const express = require('express');
const router = express.Router();

const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');

// database 연동 전 메모리에서 사용자 정보 관리
const infoMap = [
  {
    id : 'sopt', 
    pwd : '1234',
    name : 'sopt',
    phone : '010-1234-1234'
  },
  {
    id : 'soomin', 
    pwd : '1234',
    name : 'soomin',
    phone : '010-1234-5678'
  }
];

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
   * TODO 2) 존재하는 ID인지 확인 (실패시 400 Error)
   */
  const arr = infoMap.filter(it => it.id == id); // 존재하는 ID인가?
  if (arr.length == 0) { // ID가 존재하지 않는다.
    res.status(statusCode.BAD_REQUEST)
      .send(authUtil.successFalse(responseMessage.NO_USER));

    return;
  }

  /**
   * TODO 3) 비밀번호 일치하는지 확인 (실패시 401 Error)
   */
  const user = arr[0]; // ID가 존재할 경우, 사용자 정보를 가져온다.
  if (user.pwd != pwd) {
    res.status(statusCode.UNAUTHORIZED)
      .send(authUtil.successFalse(responseMessage.MISS_MATCH_PW));
    
    return;
  }

  /**
   * TODO 4) 유저 정보 응답하기
   * 위의 절차들을 다 거치고 난 후이므로 로그인 성공
   */
  res.status(statusCode.OK)
    .send(authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, user));
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
   * TODO 2) 존재하는 ID인지 확인 (실패시 401 Error)
   */
  const arr = infoMap.filter(it => it.id == id);
  if (arr.length > 0) {
    res.status(statusCode.UNAUTHORIZED)
      .send(authUtil.successFalse(responseMessage.ALREADY_ID));

    return;
  }

  /**
   * TODO 3) 사용자 정보를 저장
   */
  const userIdx = infoMap.push({
    id,
    pwd,
    name,
    phone
  });
  console.log(infoMap);

  /**
   * TODO 4) 새로 추가된 유저 index 반환
   */
  res.status(statusCode.OK)
    .send(authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS, userIdx));
});

module.exports = router;
