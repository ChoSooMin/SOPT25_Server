const crypto = require('crypto');
const fs = require('fs');

const password = 'password';
const salt = crypto.randomBytes(32); // randomByte로 salt값 생성
const derivedKey = crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512');

fs.writeFileSync('password-sync.txt', derivedKey.toString('hex'));
console.log('complete write password');