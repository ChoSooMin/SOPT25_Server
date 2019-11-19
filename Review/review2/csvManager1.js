const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv');
const csvtojson = require('csvtojson');

/*
    1. jsonArray를 csv 파일로 저장
    2. csv 파일을 읽어서 jsonArray로 반환
    3. csv 파일을 읽어서 해당하는 jsonObject만 반환
*/  
// Level 1) 단일 파일에만 저장
const filePath = './public/csv/';
const fileName = 'file1.csv';

const csvManager = {
    write : (json) => {
        return new Promise((resolve, reject) => {
            const resultCsv = json2csv.parse(json);
            fs.writeFile(path.join(filePath, fileName), resultCsv, (err) => {
                if(err) { 
                    reject(err);
                    return;
                }
                
                resolve(true);
            });
        });
    },

    read : () => {
        return new Promise((resolve, reject) => {
            csvtojson().fromFile(path.join(filePath, fileName)).then((jsonArr) => {
                resolve(jsonArr); // csv 파일로부터 변환한 json 배열을 resolve로 보낸다.
            }, (err) => {
                reject(err);
            });
        });
    },

    writeWithFileName: (fileName, jsonArray) => {
        return new Promise((resolve, reject) => {
            const resultCsv = json2csv.parse(jsonArray);
            
        })
    }
}

module.exports = csvManager;