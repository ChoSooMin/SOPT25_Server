const json2csv = require('json2csv');

const jsonArray = [
    { id : 'admin', pw : 'admin', name : '관리자' },
    { id : 'soomin', pw : 'soomin', name : '조수민' },
    { id : 'sopt', pw : 'sopt123', name : '솝트' }
]
const resultCsv = json2csv.parse(jsonArray); // json2csv 모듈을 사용하여 json 배열을 csv 형태의 String으로 변환한다.
console.log(resultCsv);