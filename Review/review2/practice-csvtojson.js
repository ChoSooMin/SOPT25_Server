const csv = require('csvtojson');

// csv 모듈을 사용하여 csvtojson.csv 파일을 json 배열로 변환한다.
csv()
.fromFile('./csvtojson.csv')
.then(
    (jsonArr) => { // 이 때 jsonArr는 변환된 json 배열
        if (!jsonArr) { // json 배열이 아니라면
            console.log(`file read err : ${err}`);
            return;
        }

        console.log(jsonArr);
    }, 
    (err) => {
        console.log(`err with readCSV : ${err}`);
    }
);