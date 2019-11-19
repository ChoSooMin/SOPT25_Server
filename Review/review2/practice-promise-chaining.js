/*
    1. score 배열 생성
    2. 배열의 합 구하기
    3. 점수를 등급으로 변환하기
    => 이 3개를 Promise Chaining으로 구현
*/

// 1. score 배열 생성
function getScoreArray(size) {
    return new Promise((resolve, reject) => {
        if (size <= 0) { // 배열의 size값이 0일 때 오류 발생
            reject(new Error("size must be positive"));  // reject로 발생한 오류를 넘겨준다.

            return;
        }

        const arr = [...Array(size)].map(idx => parseInt(Math.random() * 11)); // score 배열 생성
        console.log(`array is ${arr}`);
        resolve(arr); // 성공적으로 배열을 생성했다면 resolve로 넘겨준다.
    });
}

// 2. 배열의 합 구하기
function getSum(arr) {
    return new Promise((resolve, reject) => {
        const sum = arr.reduce((prev, current) => prev + current); // 배열의 합

        if (sum <= 0) {
            reject(new Error("sum must be larger than 0"));


            return;
        }

        console.log(`sum : ${sum}`);
        resolve(sum); // 성공적으로 sum 값이 생성되었다면, 생성한 sum 값을 resolve로 넘겨준다.
    });
}

// 3. 점수를 등급으로 반환하기
function getGrade(result) { 
    return new Promise((resolve, reject) => {
        let grade;

        switch(parseInt(result / 10)) {
            case 9:
            case 8:
                grade = 'A'; 
                break;
            case 7:
                grade = 'B';
                break;
            case 6:
                grade = 'C';
                break;
            case 5:
                grade = 'D';
                break;
            default:
                reject(new Error(`too low score(${result})`)); // 에러 발생시 reject로
                return;
        }

        resolve(grade); // 성공적으로 grade로 반환했으면 resolve로 넘겨준다.
    });
}

// 4. 함수 Chaining
/*
    각각의 Promise가 then을 통해서 결과 전달, 
    중간에 에러가 발생하면 이후의 then으로 전달되지 않고 catch로 이동한다.
*/
getScoreArray(10)
.then(getSum)
.then(getGrade)
.then((result) => console.log(`grade is ${result}`))
.catch(err => {
    console.log(`Error : ${err}`);
});