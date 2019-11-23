const express = require('express');
const router = express.Router();
const util = require('../../../module/util/utils');

/**
 * /api/walk
 */
router.get('/', (req, res) => {
    try {
        const randomNum = Math.floor(Math.random() * 150) + 50;
        console.log(randomNum);

        res.status(200).send(util.successTrue(randomNum));
    }
    catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;