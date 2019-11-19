const http = require('http'); // 모듈을 가져오는 부분

http.createServer((req, res) => {
    console.log('get message'); // console에 로그 남김
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write('Hello nodejs');
    res.end();
}).listen(3000);