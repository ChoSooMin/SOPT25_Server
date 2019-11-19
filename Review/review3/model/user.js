/**
 * routes에서 구현한 로그인, 회원가입 로직을 model로 분리한다.
 */

const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');

/**
 * infoMap은 DB에 적용하기 이전 임시 변수
 * 즉, require 요청한 블록에 생성된다.
 */

const infoMap = [
    {
        id : 'sopt'
    }
];