const statusCode = require('../module/utils/statusCode');
const responseMessage = require('../module/utils/responseMessage');
const authUtil = require('../module/utils/authUtil');

const articleArr = [
    {
        articleIdx : 0,
        title : 'nodejs 시작하기1',
        content : 'nodejs란...',
        blogIdx : 0
    },
    {
        articleIdx: 1,
        title: 'nodejs 시작하기2',
        content: 'nodejs란...',
        blogIdx : 0
    }
];

const article = {
    /**
     * article 생성
     */
    create: () => {

    },

    /**
     * 하나의 article 읽기
     */
    read: () => {

    },
    /**
     * 모든 article 읽기
     */
    readAll: () => {

    },
    
    /**
     * 특정 article 수정
     */
    update: () => {

    },

    /**
     * 특정 article remove
     */
    remove: () => {

    }
}
module.exports = article;
