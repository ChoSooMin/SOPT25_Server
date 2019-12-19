const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const authUtil = require('../module/authUtil');

const blogArr = [
    {
        name : `Soomin's blog1`,
        address : 'https://github.com/ChoSooMin',
        ownerId : 'soomin1'
    },
    {
        name : `Soomin's blog2`,
        address : 'https://github.com/ChoSooMin',
        ownerId : 'soomin2'
    }
];

const blog = {
    /**
     * blog 객체 생성
     */
    create: (name, address, ownerId) => {
        return new Promise((resolve, reject) => {
            const blogIdx = blogArr.push({
                name,
                address,
                ownerId
            });

            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_CREATE_SUCCESS, blogIdx)
            })
        });
    },

    /**
     * blogArr의 특정 인덱스 데이터 받아오기
     */
    read: (blogIdx) => {
        return new Promise((resolve, reject) => {
            // blogIdx가 blogArr의 길이보다 크거나 같으면 잘못된 인덱스
            if (blogIdx >= blogArr.length) {
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.BAD_REQUEST)
                });
                return;
            }

            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_READ_SUCCESS, blogArr[blogIdx])
            });
        });
    },

    /**
     * blogArr의 모든 데이터 받아오기
     */
    readAll: () => {
        return new Promise((resolve, reject) => {
            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_READ_ALL_SUCCESS, blogArr)
            });
        });
    },

    /**
     * 특정 blog 데이터 수정
     */
    update: (blogIdx, name, address, ownerId) => {
        return new Promise((resolve, reject) => {
            // blogIdx가 blogArr의 길이와 크거나 같으면 잘못된 인덱스
            if (blogIdx >= blogArr.length) {
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.BAD_REQUEST)
                });
                return;
            }

            // ownerId 확인
            if (blogArr[blogIdx].ownerId != ownerId) {
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.MISS_MATCH_OWNER)
                });
                return;
            }

            blogArr[blogIdx].name = name;
            blogArr[blogIdx].address = address;
            
            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_UPDATE_SUCCESS, blogArr[blogIdx])
            });
        });
    },

    /**
     * 특정 blog 삭제
     */
    remove: (blogIdx) => {
        return new Promise((resolve, reject) => {
            console.log(blogIdx);
            // idx 확인
            if (blogIdx >= blogArr.length) {
                console.log('blogIdx more than length')
                resolve({
                    code : statusCode.BAD_REQUEST,
                    json : authUtil.successFalse(responseMessage.BAD_REQUEST)
                });
                return;
            }

            blogArr.splice(blogIdx, 1);
            console.log('splice success');
            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_DELETE_SUCCESS, blogArr)
            });
            console.log('resolve success');
        });
    }
};

module.exports = blog;