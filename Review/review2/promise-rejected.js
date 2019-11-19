function getData() {
    return new Promise((resolve, reject) => {
        reject(new Error("Request is failed"));
    });
}

getData().then().catch((err) => {
    console.log("에러 발생" + err);
});