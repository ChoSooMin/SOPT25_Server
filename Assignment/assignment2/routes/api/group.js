const express = require('express');
const router = express.Router();
const csvManager = require('../../module/csvManager'); // 내가 생성한 모듈인 csvManager를 가져온다.
const groupMixer = require('../../module/groupMixer'); // groupMixer 모듈을 가져온다.

/**
 * 비동기 패턴은 Async/Await 사용
 * => 함수 앞에 async를 쓰고, 처리할 비동기 메소드 앞에 await을 붙인다.
 */

/**
 * [/api/group] : 전체 그룹 구성을 조회한다.
 */
router.get('/', async (req, res) => {
    try {
        /**
         * Level 1) 조회
         * group.csv 파일을 읽어와서 groupArray로 받는다.
         */
        const groupArray = await csvManager.read('group.csv');
        // console.log(groupArray);

        /**
         * Level 2) 조회할 때 groupIdx 대신에 그룹 이름으로 보여준다.
         */
        const groupNameList = {};
        groupArray.forEach( element => { // groupNameList에 차례로 넣음
            groupNameList[element.groupIdx] = element.name;
        });

        /**
         * Level 1) 조회
         * member.csv 파일을 읽어와서 memberArray로 받는다.
         */
        const memberArray = await csvManager.read('member.csv');
        // console.log(memberArray);

        /**
         * Level 2) 조회할 때 groupIdx 대신에 그룹 이름으로 보여준다.
         * member.csv의 groupIdx와 group.csv의 groupIdx는 같음 .. 이걸 사용하여 묶어준다?
         */
        const totalMembers = memberArray
            .map(element => `${element.name} : ${groupNameList[element.groupIdx]}`)
            .join('\n');

        res.status(200).send(totalMembers);
    }
    catch (err) { // 에러 난 경우
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * [/api/group/:groupIdx] : 그룹 구성원을 조회한다.
 */
router.get('/:groupIdx', async (req, res) => {
    const groupIdx = req.params.groupIdx; // 클라이언트가 parameter로 보낸 groupIdx를 받아온다.

    try {
        /**
         * Level 1) 조회
         * group.csv 파일을 읽어 가져옴
         */
        const groupArray = await csvManager.read('group.csv');

        const groupNameList = {};
        groupArray.forEach( element => { // groupNameList에 차례로 넣음
            groupNameList[element.groupIdx] = element.name;
        });

        /**
         * Level 1) 조회
         * member.csv 파일을 읽어 가져옴
         */
        const memberArray = await csvManager.read('member.csv');


        /**
         * Level 2) 조회할 때 groupIdx 대신 그룹 이름으로 보여준다.
         * memberArray중, 특정 groupIdx에 해당하는 구성원을 조회한다.
         */
        const groupMembers = memberArray
            .filter(it => it.groupIdx == groupIdx)
            .map(it => `${it.name} : ${groupNameList[it.groupIdx]}`)
            .join('\n');

        res.status(200).send(groupMembers);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * Level 3) 구성원들의 조원을 섞어주는 모듈(groupMixer)을 만들어 사용
 * 
 * 1. member.csv 파일을 읽어 memberArray(json 배열)로 가져온다.
 * 2. groupMixer 모듈을 사용하여 받아온 memberArray를 새롭게 섞어주고, 새로 섞여 생성된 mixedArray를 받아온다.
 * 3. csvManager 모듈을 사용하여 기존의 member.csv 파일에 새로운 mixedArray를 write 해준다.
 */
router.get('/mix', async (req, res) => {
    try {
        /**
         * member.csv 파일을 읽어 가져옴
         */
        const memberArray = await csvManager.read('member.csv');

        const mixedArray = groupMixer.mix(memberArray); // groupMixer 모듈로 조원을 섞은 새로운 array를 가져옴
        await csvManager.write('member.csv', mixedArray); // 조원을 섞은 새로운 배열을 csvManager.write을 사용하여 member.csv에 넣어준다.

        /**
         * @todo 이 부분 왜 제대로 응답이 안가지지,, (postman에 'success mixing group'이라는 응답이 안온다.)
         */
        res.status(200).send('success mixing group');
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;