const crypto = require('crypto'); // crypto 모듈
const fs = require('fs');

const password = 'password'; // 비밀번호 

crypto.randomBytes(32, (err, salt) => {
    if (err) // 에러 발생하면
        throw err; // throw

    // 1) 암호 2) 암호학 솔트 => 이 두 개를 합쳐 암호를 만든다?
    // derivedKey가 생성된 키
    crypto.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
        if (err)
            throw err;
        
        fs.writeFile('password.txt', derivedKey.toString('hex'), (err) => {
            if (err)
                throw err;
            
            
            console.log('complete write password');
        });
    });
    // => 이렇게 하면 콜백 함수가 중첩된다. = 콜백헬
});