// 암호 로직을 encryption.js로 분리한다.
const crypto = require('crypto');
const pbkdf2 = require('pbkdf2'); // 사용하기 위해 npm install pbkdf2 필요

function encryptPBKDF2(password, next) {
    crypto.randomBytes(32, madeSaltFunc); // salt 생성

    function madeSaltFunc(err, salt) {
        if (err) throw err;

        pbkdf2.pbkdf2(password, salt, 1, 32, 'sha512', madeKeyFunc); // 암호화
    }

    function madeKeyFunc(err, derivedKey) {
        if (err) throw err;

        next(err, derivedKey.toString('hex')); // 위의 일들을 다 한 후, 실행되는 함수
    }
}

module.exports = encryptPBKDF2; // 모듈로 분리