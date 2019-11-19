const express = require('express');
const router = express.Router();

const multer = require('multer'); // multer 사용
/* 이 코드는 내 로컬에 이미지를 저장하는 코드
const upload = multer({ dest : 'uploads/' }); 
*/

// 내 S3에 이미지 저장하려면
// (저장되는 경로만 바꿔주는 것)
const upload = require('../config/multer'); // config/multer.js의 19번째 코드인 module.exports = upload;가 이 10번째 줄의 upload가 되는 것이다.

// upload.single('image')는 꼭 명시해줘야 클라에서 이미지를 보낼 때 이미지라는 걸 알아차린다.
router.post('/single', upload.single('image'), (req, res) => {
    console.log(req.file); // 하나의 이미지만 받을 때는 req.file이고, array로 받을 때는 req.files로 해야 한다.
    console.log(req.body);
    res.send({ file: req.file, body: req.body });
});

// array 실습
// maxCount를 설정하지 않으면 무한대로 받을 수 있다.
// 만약에 maxCount를 2개로 설정했는데 2개를 넘게 보내면 에러가 난다.
// 에러 catch는 try ... catch로 하면 됨
router.post('/array', upload.array('photos', 5), (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.send({
        file : req.files,
        body : req.body
    });
});

// fileds 실습
var cpUpload = upload.fields([ { name : 'thumbnail', maxCount : 2 }, { name : 'images', maxCount : 5 } ]);
router.post('/fields', cpUpload, (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.send({
        file : req.files,
        body : req.body
    });
});

module.exports = router;