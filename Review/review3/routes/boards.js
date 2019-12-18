const express = require('express');
const router = express.Router();
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');
const Board = require('../model/board');

/**
 * 게시글 전체 보기
 */
router.get('/', (req, res) => {
    Board
    .readAll()
    .then(
        ({ code, json }) => {
            res.status(code).send(json);
        }
    )
    .catch( (err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/**
 * 게시글 개별 보기
 */
router.get('/:id', (req, res) => {
    const id = req.params.id; // request에서 parameter로 받아온 id값 가져오기

    // 클라에서 parameter로 id를 보내지 않았을 경우
    if (!id) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Board.read(id)
    .then(
        ({ code, json }) => {
            res.status(code).send(json);
        }
    )
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/**
 * 게시글 작성하기
 */
router.post('/', (req, res) => {
    const {
        title,
        content, 
        writer,
        pwd,
    } = req.body; // 클라에서 request의 body로 보내온 값을 객체로..?

    // title, content, writer, pwd 중 하나라도 없으면?
    if (!title || !content || !writer || !pwd) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    // 제대로 값이 왔을 때
    Board.create(title, content, writer, pwd)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/**
 * 게시글 수정하기
 */
router.put('/', (req, res) => {
    const {
        idx, 
        title,
        content, 
        writer,
        pwd
    } = req.body;

    // 받아와야 할 값이 하나라도 없을 때
    if (!idx || !title || !content || !writer || !pwd) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    // 제대로 값을 받았을 때
    Board.update(idx, title, content, writer, pwd)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/**
 * 게시글 삭제하기
 */
router.delete('/', (req, res) => {
    const {
        idx, 
        pwd
    } = req.body;

    if (!idx || !pwd) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    // 제대로 
    Board.delete(idx, pwd)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        // 질문) 이 두 개 아래는 뭔 차이일까..?
        // res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;