/**
 * Level 3) 구성원들의 조원을 섞어주는 모듈(groupMixer)을 만든다.
 * 
 * 배열 무작위 섞기 참고 자료 (mixedArray에 사용된 부분)
 * @see http://milooy.github.io/TIL/JavaScript/array-shuffle.html
 */
const groupMixer = {
    mix : (memberArray) => {
        return new Promise((resolve, reject) => {
            if (memberArray instanceof Array) { // 들어온 변수 값이 Array 객체인지 확인해야 함
                const mixedArray = memberArray.sort(function() {
                    return Math.random() - 0.5;
                });
    
                resolve(mixedArray);
    
                if (err) {
                    reject(err);
                }
            }
            else {
                console.log(`not Array Object`);
            }
            
        });
    }
};

module.exports = groupMixer; // 다른 곳에서 이 모듈을 groupMixer라는 이름으로 사용하겠다?