const express = require('express');
const router = express.Router();
const pool = require('../module/pool');

/**
 * DB에 데이터 추가
 */
router.get('/insert', async (req, res) => {
    const table = 'user';
    const fields = 'name, password, phone, id';
    const questions = `'sopt', '1234', '010-0000-0000', 'sopt'`;
    const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields}) VALUES(${questions})`);
    
    if (!result) {
        res.status(500).send('error');
        return;
    }

    res.status(200).send(result);
});

/**
 * DB에서 사용자 테이블 전체 데이터 받아오기
 */
router.get('/select', async(req, res) => {
    const table = 'user';
    const result = await pool.queryParam_None(`SELECT * FROM ${table}`);

    if (!result) {
        res.status(500).send('error');
        return;
    }

    res.status(200).send(result);
});

/**
 * DB에 있는 user 테이블 데이터 업데이트
 */
router.get('/update', async(req, res) => {
    const table = 'user';
    const result = await pool.queryParam_None(`UPDATE ${table} SET name = 'soptTest' where name = 'sopt'`);
    console.log(result);

    if (!result) {
        res.status(500).send('error');
        return;
    }

    res.status(200).send(result);
});

/**
 * DB에 있는 user 테이블 중 이름이 sopt인 데이터 삭제
 */
router.get('/delete', async(req, res) => {
    const table = 'user';
    const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE name='sopt'`);
    console.log(result);

    if (!result) {
        res.status(500).send('error');
        return;
    }

    res.status(200).send(result);
});

module.exports = router;