const express = require('express');
const router = express.Router();
const csvManager = require('../../module/csvManager'); // 내가 생성한 모듈인 csvManager를 가져온다.

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
})

module.exports = router;