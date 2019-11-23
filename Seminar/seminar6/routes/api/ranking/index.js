var express = require('express');
var router = express.Router();

/**
 * /api/ranking
 */

// incomplete
const rankingData = [
    {
        name : '리틀프렌즈 전신필통',
        price : '15,000',
        category : '프렌즈 문구/전시',
        thumbnail : ''
    },
    {
        name : '리틀프렌즈 전신필통',
        price : '15,000',
        category : '프렌즈 문구/전시',
        thumbnail : ''
    },
    {
        name : '리틀프렌즈 전신필통',
        price : '15,000',
        category : '프렌즈 문구/전시',
        thumbnail : ''
    },
    {
        name : '리틀프렌즈 전신필통',
        price : '15,000',
        category : '프렌즈 문구/전시',
        thumbnail : ''
    }
];

router.get('/', (req, res) => {
    try {
        

        res.status(200).send(util.successTrue(randomNum));
    }
    catch (err) {
        
    }
});

module.exports = router;