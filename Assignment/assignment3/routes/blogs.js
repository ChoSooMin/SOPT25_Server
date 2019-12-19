const express = require('express');
const router = express.Router();

const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');

const Blog = require('../model/Blog');

/**
 * [GET] localhost/blogs
 * Blog 데이터 모두 받아오기(readAll) 
 */
router.get('/', (req, res) => {
    Blog.readAll()
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/*
    [GET] localhost/blogs/${blogIdx}
    블로그 하나보기
*/
router.get('/:blogIdx', (req, res) => {
    const {blogIdx} = req.params;
    // parameter null check
    if (!blogIdx) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Blog.read(blogIdx)
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

/*
    [POST] localhost/blogs/
    블로그 생성하기
*/
router.post('/', (req, res) => {
    // parameter null check
    const {
        name,
        address,
        ownerId
    } = req.body;
    
    if (!name || !address || !ownerId) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    
    Blog.create(name, address, ownerId)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/**
 * [PUT] localhost/blogs/
 * 블로그 수정하기
 */
router.put('/', (req, res) => {
    // parameter null check
    const {
        blogIdx,
        name,
        address,
        ownerId
    } = req.body;
    
    if (!blogIdx || !name || !address || !ownerId) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    
    Blog.update(blogIdx, name, address, ownerId)
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    });
});

/**
 * [DELETE] localhost/blogs/
 * 블로그 삭제하기
 * @TODO 500 error
 */
router.delete('/', (req, res) => {
    // parameter null check
    const {
        blogIdx
    } = req.body;
    
    if (!blogIdx) {
        res.status(statusCode.BAD_REQUEST, authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }

    Blog.remove({blogIdx})
    .then(({ code, json }) => {
        res.status(code).send(json);
    })
    .catch((err) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR, authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));
    }); 
});

module.exports = router;