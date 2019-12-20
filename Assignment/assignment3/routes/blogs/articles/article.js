const express = require('express');
const router = express.Router({
    mergeParams: true
});
const statusCode = require('../../../module/utils/statusCode');
const responseMessage = require('../../../module/utils/responseMessage');
const authUtil = require('../../../module/utils/authUtil');
const Article = require('../../../model/Article');

const THIS_LOG = '게시글';
/*
    [GET] localhost/blogs/${blogIdx}/articles
    게시글 전체 보기
*/
router.get('/', (req, res) => {
    const { blogIdx } = req.params;
    
    Article.readAll(blogIdx)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.BAD_REQUEST));
    });
});
/*
    [GET] localhost/blogs/${blogIdx}/articles/${articleIdx}
    게시글 하나보기
*/
router.get('/:articleIdx', (req, res) => {
    const {blogIdx, articleIdx} = req.params;
    
    if (!blogIdx || !articleIdx) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Article.read(articleIdx)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.BAD_REQUEST, responseMessage.BAD_REQUEST);
    });
});
/*
    [POST] localhost/blogs/${blogIdx}/articles
    게시글 생성하기
*/
router.post('/', (req, res) => {
    const { blogIdx } = req.params;
    // TODO 1 parameter null check
    const { title, content } = req.body;

    if (!blogIdx || !title || !content) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Article.create(title, content, blogIdx)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR);
    });
});
/*
    [PUT] localhost/blogs/${blogIdx}/articles
    게시글 수정하기
*/
router.put('/', (req, res) => {
    const {blogIdx} = req.params;
    // TODO 1 parameter null check
    const {articleIdx, title, content} = req.body;
    
    if (!articleIdx || !title || !content || !blogIdx) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Article.update(articleIdx, title, content)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});
/*
    [DELETE] localhost/blogs/${blogIdx}/articles
    게시글 삭제하기
*/
router.delete('/', (req, res) => {
    // TODO 1 parameter null check
    const { blogIdx } = req.params; // 이건 확인할 필요 없나 ..?
    const { articleIdx } = req.body;
    
    if (!articleIdx) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Article.remove(articleIdx)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});
module.exports = router;
