const csvToJson = require('csvtojson'); // csvtojson 모듈을 가져온다.
const json2csv = require('json2csv'); // json2csv 모듈을 가져온다.
const fs = require('fs'); // 파일 시스템 fs 모듈을 가져온다.
const path = require('path');

const filePath = './public/csvs/'; // assignment2/public/csv 폴더에 filePath ,,

/*
    1. jsonArray를 csv 파일로 저장
    2. csv 파일을 읽어서 jsonArray로 반환
    3. csv 파일을 읽어서 해당하는 jsonObject만 반환
*/

const csvManager = {
    // 파일 쓰기
    write : (fileName, json) => { // fileName으로 파일 이름을 지정할 수 있다.
        return new Promise((resolve, reject) => {
            const resultCsv = json2csv.parse(json);

            fs.writeFile(path.join(filePath, fileName), resultCsv, (err) => { // fs 모듈을 사용하여 file에 쓴다.
                if (err) {
                    reject(err);
                    return;t
                }

                resolve(true);
            });
        });
    },

    // 파일 읽기
    read : (fileName) => {
        return new Promise((resolve, reject) => {
            csvToJson().fromFile(path.join(filePath, fileName)).then((jsonArray) => {
                resolve(jsonArray); // csv 파일로부터 변환한 json 배열을 resolve로 보낸다.
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = csvManager; // 다른 곳에서 csvManager라는 이름으로 이 모듈을 부를 수 있다?