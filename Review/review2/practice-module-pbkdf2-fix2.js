const fs = require('fs');
const encryption = require('./encryption'); // 암호화 로직을 분리한 모듈 encryption을 가져온다.

const password = 'password';

// encryption 모듈 안의 encryptPBKDF2 함수를 사용할 수 있다.
encryption(password, (error, derivedKey) => {
    fs.writeFile('password-fix2.txt', derivedKey, wroteFileFunc);

    function wroteFileFunc(err) {
        if (err) throw err;

        console.log('complete write password');
    }
});