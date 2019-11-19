const crypto = require('crypto');
const fs = require('fs');

const password = 'password';

crypto.randomBytes(32, madeSaltFunc);

// salt값 만드는 함순
function madeSaltFunc(err, salt) {
    if (err) throw err;

    crypto.pbkdf2(password, salt, 1, 32, 'sha512', madeKeyFunc); // 생성된 salt 값을 사용하여 암호화를 통해 derivedKey를 생성한다.
}

// derivedKey를 만드는 함수
function madeKeyFunc(err, derivedKey) {
    if (err) throw err;

    fs.writeFile('password-fix1.txt', derivedKey.toString('hex'), wroteFileFunc); // 생성된 derivedKey 값을 'password-fix1.txt' 파일에 입력한다.
}

// password-fix1.txt 파일에 입력한 후의 함수
function wroteFileFunc(err) {
    if (err) throw err;

    console.log('complete write password-fix1');
}