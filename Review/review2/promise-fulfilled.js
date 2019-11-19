function getData() {
    // Promise 객체 반환 | resolve는 작업 성공했을 때, reject는 실패했을 때 실행되는 callback 함수
    // return new Promise(function(resolve, reject) { 
    //     var data = 25;

    //     resolve(data);
    // });

    // 화살표 함수 사용
    return new Promise((resolve, reject) => {
        var data = 25;

        resolve(data);
        reject(new Error("Request is failed"));
    });
}

/*
// method chaining X
// then을 사용해 성공한 경우의 데이터를 받아온다.
getData.then(function(resolvedData) {
    console.log(resolvedData);
});

화살표 함수 사용
getData().then((resolvedData) => {
    console.log(resolvedData);
});

getData().then().catch((err) => {
    console.log("에러 발생 " + err);
});
*/

// method chaining
getData().then((resolvedData) => {
    console.log(resolvedData);
}).catch((err) => {
    console.log("에러 발생 " + err);
});