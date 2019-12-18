const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');

/**
 * boardArr는 DB가 없기 때문에 가상으로 만든 배열 
 * -> 모듈이 호출될 때 생기는 배열(테스트용)
 */
const boardArr = [
    {
        title : 'SOPT',
        content : 'hello',
        writer : 'sopt',
        pwd : '1234',
        time : Date.now()
    },
    {
        title : 'soomin',
        content : 'SOOMIN',
        writer : 'soom',
        pwd : '1234',
        time : Date.now()
    }
];

const board = {
    create : (title, content, writer, pwd) => {
        return new Promise( (resolve, reject) => {
            const idx = boardArr.push({
                title,
                content, 
                writer,
                pwd, 
                time : Date.now()
            });

            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS, idx)
            });
        });
    },
    readAll : () => {
        return new Promise((resolve, reject) => {
            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_READ_ALL_SUCCESS, boardArr)
            });
        });
    },
    read : (idx) => {
        return new Promise((resolve, reject) => {
            // idx가 boardArr의 길이보다 같거나 크면 잘못된 인덱스
            if (idx >= boardArr.length) { 
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.NO_BOARD)
                });

                return; // return 해줘야 함
            }

            // idx가 범위 내에 있을 때 (제대로 넣었을 때)
            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_READ_SUCCESS, boardArr[idx])
            });
        });
    },
    update : (idx, title, content, writer, pwd) => {
        return new Promise((resolve, reject) => {
            // idx값 확인
            if (idx >= boardArr.length) {
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.NO_BOARD)
                });

                return;
            }

            // 비밀번호 확인
            if (boardArr[idx].pwd != pwd) {
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });

                return;
            }

            // 제대로 입력되었을 때
            // update 해줘야 함
            boardArr[idx].title = title;
            boardArr[idx].content = content;
            boardArr[idx].writer = writer;

            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS, boardArr[idx])
            });
        });
    },
    delete : (idx, pwd) => {
        return new Promise((resolve, reject) => {
            // idx 확인
            if (idx >= boardArr.length) {
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.NO_BOARD)
                });

                return;
            }

            // pwd 확인
            if (boardArr[idx].pwd != pwd) {
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });

                return;
            }

            // idx와 pwd 모두 맞다면
            boardArr[idx] = {}; // idx 자리에 있는 board를 빈 객체로..
            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS)
            });
        });
    }
};

module.exports = board; // 또는 module.exports = { 이 안에 board의 내용 };