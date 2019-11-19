const jwt = require('../jwt');
const resMessage = require('./responseMessage');
const statusCode = require('./statusCode');
const util = require('./utils');

const authUtil = {
    LoggedIn : async(req, res, next) => {
        const token = req.headers.token;
        // 1. token 존재하는지 확인
        if (!token) {
            return res.status(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.NULL_VALUE));

            return;
        }

        // 2. token이 유효한지 확인
        const result = jwt.verify(token);
        if (result == -1) {
            res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.EXPIRED_TOKEN));

            return;
        }
        if (result == -2) {
            res.status(statusCode.UNAUTHORIZED)
            .send(util.successFalse(resMessage.INVALID_TOKEN));

            return;
        }


        const userIdx = result.idx;
        // 1. userIdx가 존재하는지 확인
        if (!userIdx) {
            res.status(statusCode.BAD_REQUEST)
            .send(util.successFalse(resMessage.NULL_VALUE));

            return;
        }

        req.decoded = userIdx;
        next();
    }

};

module.exports = authUtil;