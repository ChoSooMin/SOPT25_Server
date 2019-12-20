const statusCode = require('../module/utils/statusCode');
const responseMessage = require('../module/utils/responseMessage');
const authUtil = require('../module/utils/authUtil');
const pool = require('../module/db/pool');

const table = 'article';
const THIS_LOG = '게시글';

const article = {
    /**
     * article 생성
     */
    create: (title, content, blogIdx) => {
        return new Promise(async(resolve, reject) => {
            const fields = `title, content, blogIdx`
            const values = `'${title}', '${content}', ${blogIdx}`;
            const query = `INSERT INTO ${table}(${fields}) VALUES(${values})`;
            console.log(query);

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
                json : authUtil.successTrue(responseMessage.X_CREATE_SUCCESS(THIS_LOG), result)
            });
        });
    },

    /**
     * 하나의 article 읽기
     */
    read: (articleIdx) => {
        return new Promise( async(resolve, reject) => {
            const query = `SELECT * FROM ${table} WHERE articleIdx=${articleIdx}`;
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
                json : authUtil.successTrue(responseMessage.X_READ_SUCCESS(THIS_LOG), result)
            });
        });
    },
    /**
     * 모든 article 읽기
     */
    readAll: (blogIdx) => {
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
                json : authUtil.successTrue(responseMessage.X_READ_ALL_SUCCESS(THIS_LOG), result)
            });
        });
    },
    
    /**
     * 특정 article 수정
     */
    update: (articleIdx, title, content) => {
        return new Promise(async (resolve, reject) => {
            const query = `UPDATE ${table} SET title='${title}', content='${content}' WHERE articleIdx=${articleIdx}`;
            console.log(query);

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
                json : authUtil.successTrue(responseMessage.X_UPDATE_SUCCESS(THIS_LOG), result)
            });
        });

    },

    /**
     * 특정 article remove
     */
    remove: (articleIdx) => {
        return new Promise(async(resolve, reject) => {
            const query = `DELETE FROM ${table} WHERE articleIdx=${articleIdx}`;
            console.log(query);

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
                json : authUtil.successTrue(responseMessage.X_UPDATE_SUCCESS(THIS_LOG), result)
            });
        });
    }
}
module.exports = article;
