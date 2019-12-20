const statusCode = require('../module/utils/statusCode');
const responseMessage = require('../module/utils/responseMessage');
const authUtil = require('../module/utils/authUtil');
const pool = require('../module/db/pool');

const table = 'blog';

const blog = {
    /**
     * blog 객체 생성
     */
    create: (name, url) => {
        
        return new Promise( async(resolve, reject) => {
            const fields = 'name, url'
            const values = `'${name}', '${url}'`;
            const query = `INSERT INTO ${table}(${fields}) VALUES(${values})`;
            console.log(query);

            const result = await pool.queryParam_None(query);
            console.log(result);
    
            if (!result) {
                resolve({
                    code : statusCode.INTERNAL_SERVER_ERROR,
                    json : authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR)
                });

                return;
            }

            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_CREATE_SUCCESS, result)
            });
        });
        


    },

    /**
     * blogArr의 특정 인덱스 데이터 받아오기
     */
    read: (blogIdx) => {
        return new Promise( async(resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE blogIdx=${blogIdx}`;
            const result = await pool.queryParam_None(query);
            console.log(result);
    
            if (!result) {
                resolve({
                    code : statusCode.INTERNAL_SERVER_ERROR,
                    json : authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR)
                });

                return;
            }

            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_READ_SUCCESS, result)
            });
        });
    },

    /**
     * blogArr의 모든 데이터 받아오기
     */
    readAll: () => {
        return new Promise(async (resolve, reject) => {
            const query = `SELECT * FROM ${table}`;
            const result = await pool.queryParam_None(query);
            console.log(result);
    
            if (!result) {
                resolve({
                    code : statusCode.INTERNAL_SERVER_ERROR,
                    json : authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR)
                });

                return;
            }

            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_READ_ALL_SUCCESS, result)
            });
        });
        
    },

    /**
     * 특정 blog 데이터 수정
     */
    update: (blogIdx, name, url) => {
        return new Promise( async(resolve, reject) => {
            const query = `UPDATE ${table} SET name='${name}', url='${url}' WHERE blogIdx=${blogIdx}`;
            console.log(query);

            const result = await pool.queryParam_None(query);
            console.log(result);
    
            if (!result) {
                resolve({
                    code : statusCode.INTERNAL_SERVER_ERROR,
                    json : authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR)
                });

                return;
            }
            
            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_UPDATE_SUCCESS, result)
            });
        });
    },

    /**
     * 특정 blog 삭제
     */
    remove: (blogIdx) => {
        return new Promise( async(resolve, reject) => {
            console.log(blogIdx);

            const query = `DELETE FROM ${table} WHERE blogIdx=${blogIdx}`;
            const result = await pool.queryParam_None(query);

            if (!result) {
                resolve({
                    code : statusCode.INTERNAL_SERVER_ERROR,
                    json : authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR)
                });

                return;
            }

            resolve({
                code : statusCode.OK,
                json : authUtil.successTrue(responseMessage.BLOG_DELETE_SUCCESS, result)
            });
        });
    }
};

module.exports = blog;