/* Promise then
**/
var promise1 = new Promise((resolve, reject) => {
    
  pseudo ? resolve("Success!")
         : reject(new Error("Error!"));
});
promise1
  .then(
    (value) => {
      console.log(value); // Success!
    },
    (reason) => {
      console.error(reason); // Error!
    },
  );


/* Promise 순차처리
**/
var promise1 = () => new Promise(resolve => setTimeout(() => resolve(1), 1000))
var promise2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000))
var promise3 = () => new Promise(resolve => setTimeout(() => resolve(3), 3000))
promise1()
  .then(result => {
    console.log(result) // 프로그램을 실행하고 1초뒤에 수행됨
    return promise2()
  })
  .then(result => {
    console.log(result) // 프로그램을 실행하고 3초뒤에 수행됨 (1 + 2)
    return promise3()
  })
  .then(result => {
    console.log(result) // 프로그램을 실행하고 6초뒤에 수행됨 (1 + 2 + 3)
  })


/* Promise.all(iterable-arr)
*  어떤 비동기 작업을 순서와 상관없이 병렬적으로 처리하되 한 작업이라도 오류가 있어서는 안되는 작업이 필요할때 유용하게 사용할수 있습니다. 
*  하나라도 에러(rejected)가 발생하면 rejected 상태가 되고 수행을 종료
*/
var promise1 = Promise.resolve(1);
var promise2 = 2;
var promise3 = new Promise((resolve, reject) => {
  setTimeout(() => { resolve("A"); }, 1000);
});
Promise.all( [promise1, promise2, promise3 ])
  .then((values) => {
    console.log(values); // [1, 2, "A"]
  })
  .catch((error) => {
    console.error(error.message)
  })
  .finally(() => {
    console.log('completed');
  });

/* Handling possible rejections:
**/
var promise1 = new Promise((resolve, reject) => {
  resolve('p1_delayed_resolution');
});
var promise2 = new Promise((resolve, reject) => {
  reject(new Error('p2_immediate_rejection'));
});
Promise.all( [promise1.catch((error) => error), promise2.catch((error) => error),] )
  .then((values) => {
    console.log(values[0]);   // "p1_delayed_resolution"
    console.log(values[1]);   // "p2_immediate_rejection"yeng constantino
  })

/* Promise.allSettled(iterable-arr)
*  rejected 상태가 되어도 수행을 종료하지않고, 프로미스가 수행된 상태와 결과값을 배열에 담아 resolve로 반환합니다.
*/
Promise.allSettled( [ Promise.resolve(1), new Promise((resolve) => setTimeout(() => resolve(2), 0)), 3, Promise.reject(new Error('an error')) ])
  .then((values) => console.log(values));
// [
//   {status: "fulfilled", value: 1},
//   {status: "fulfilled", value: 2},
//   {status: "fulfilled", value: 3},
//   {status: "rejected",  reason: Error: an error}
// ]


/* await Promise
*/
var values = await Promise.allSettled( [ Promise.resolve(1), new Promise((resolve) => setTimeout(() => resolve(2), 0)), 3, Promise.reject(new Error('an error')) ])
console.log(values)
// [
//   {status: "fulfilled", value: 1},
//   {status: "fulfilled", value: 2},
//   {status: "fulfilled", value: 3},
//   {status: "rejected",  reason: Error: an error}
// ]


/* Promise.any(iterable-arr)
*  If an empty iterable is passed, then the promise returned by this method is rejected synchronously.
*  어느거 하나 끝날을때 리턴
*/
var pErr = new Promise((resolve, reject) => {
  reject("Always fails");
});
var pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "Done eventually");
});
var pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "Done quick");
});
Promise.any( [pErr, pSlow, pFast] )
  .then((value) => {
    console.log(value); // "Done quick"
  });


/* Rejections with AggregateError
*/
var failure = new Promise((resolve, reject) => {
  reject("Always fails");
});
Promise.any([failure])
  .catch((err) => {
    console.log(err); // "AggregateError: No Promise in Promise.any was resolved"
  });


/* Display the first one available
*/
function fetchAndDecode(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return response.blob();
    }
  });
}
var coffee = fetchAndDecode("coffee.jpg");
var tea = fetchAndDecode("tea.jpg");
Promise.any([coffee, tea])
  .then((value) => {
    var objectURL = URL.createObjectURL(value);
    var image = document.createElement("img");
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch((e) => {
    console.error(e);
  });



/* Promise.race(iterable)
*  If the iterable passed is empty, the promise returned will be forever pending.
*  안쓰는걸로 하자
*/












