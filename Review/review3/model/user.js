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

const user = {
    /**
     * 로그인
     */
    signin : (id, pwd) => {
        return new Promise((resolve, reject) => {
            /**
             * TODO 2) 존재하는 ID인지 확인 (실패시 400 Error)
             */
            const arr = infoMap.filter(it => it.id == id);
            if (arr.length == 0) {
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.NO_USER)
                });

                return;
            }

            /**
             * TODO 3) 비밀번호 일치하는지 확인 (실패시 401 Error)
             */
            const user = arr[0]; // user 정보를 가져온다.
            if (user.pwd != pwd) { // 비밀번호가 맞지 않으면
                resolve({
                    code : statusCode.UNAUTHORIZED,
                    json : authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });

                return;
            }

            /**
             * TODO 4) 유저 정보 응답
             */
            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, user)
            });
        });
    },
    
    /**
     * 회원가입
     */
    signup : (id, pwd, name, phone) => {
        return new Promise((resolve, reject) => {
            /**
             * TODO 2) 존재하는 ID인지 확인 (실패시 401 Error)
             */
            const arr = infoMap.filter(it => it.id == id);
            if (arr.length > 0) {
                resolve({
                    code : statusCode.UNAUTHORIZED,
                    json : authUtil.successFalse(responseMessage.ALREADY_ID)
                });

                return;
            }

            /**
             * TODO 3) 사용자 정보 저장
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
            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.SIGN_UP_SUCCESS, userIdx)
            });
        });
    }
};

module.exports = user;