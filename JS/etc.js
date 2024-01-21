/****************************************************
 * Module import & export 
 ***************************************************/
{  // FILE: module1.js
  export { myFunction as default }; // or =>
  export default myFunction;
}
{  // FILE: Main.js
  import AAA from './module1.js'; // 디포트일떄는 {}필요없음
}

{ // FILE: module1.js 
  export { LongModuleExportName as 'short name' , LongModuleExportName as shortName }
}
{ // FILE: Main.js
  import { LongModuleExportName as shortName } from './module1.js'
}


/****************************************************
 * Re-exporting 
 ***************************************************/
{ // FILE: module1.js
  function function1(){}
  export { default as App1 } from './App1.js';
  export { default as App2, function1 } from './App2.js';
}
{ // FILE: Main.js
  import { App1, App2, function1 } from './module1.js';
}

{ // FILE: Main.js
  import util_a from 'utils/util_a'
  import util_b from 'utils/util_b'
  import util_c from 'utils/util_c'
  // 이렇게 바꿀수도있다.
  import { util_a, util_b , util_c } from 'utils' 
}


/****************************************************
 * Modul revoke
 ***************************************************/
import('./module1.js')
    .then((module) => {
      // Do something with the module.
    });


/****************************************************
 * Module get set
 ***************************************************/
{ // FILE: module1.js
  let x = 5;
  export const getX = () => x;
  export const setX = (val) => { x = val;}
}
{ // FILE: Main.js
  import { getX, setX } from './module1.js';
  console.info(getX()); // 5
  setX(6);
  console.info(getX()); // 6
}


/****************************************************
 * Closure
 * 각 함수 인스턴스가실행됬을떄 자체 범위와 클로저가 관리됨
 ***************************************************/
Arr = [{id:'A', name:'aaa'}, {id:'B', name:'bbb'}];
function AA_Func(name) {
  document.getElementById('name').textContent = name;
};
// NG: 클로저가 여러개 생겼지만 같은 item변수를 바라보게 됨
for (var i = 0; i < Arr.length; i++) {
  var item = Arr[i];
  document.getElementById(item.id).onfocus = function(){AA_Func(item.name)};
};
// OK: 클로저 안에 클로저를 만들어서 item변수를 쪼개서 가둠
for (var i = 0; i < Arr.length; i++) {
  var item = Arr[i];
  document.getElementById(item.id).onfocus = AA_Isolate(item.name);
};
function AA_Isolate(name) {
  return function(){
    AA_Func(name);
  };
};
// OK: ()()쓰기
for (var i = 0; i < Arr.length; i++) {
  (function () {
    var item = Arr[i];
    document.getElementById(item.id).onfocus = function(){AAA(item.name)};
  })(); 
};
// OK: 그냥 let const 쓰자
for (let i = 0; i < Arr.length; i++) {
  const item = Arr[i];
  document.getElementById(item.id).onfocus = () => {AAA(item.name)};
};
// OK: FOREACH쓰기
Arr.forEach(function (text) {
  document.getElementById(text.id).onfocus = function () { AAA(text.name); };
});


/****************************************************
 * Function 함수배당
 ***************************************************/
// NG => 이렇게 하면 생성될떄마다 함수가 재 할당된다.
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function () {
    return this.name;
  };

  this.getMessage = function () {
    return this.message;
  };
};

// OK => 프로토타임으로 상속하도록 해서 재할당막음.
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype.getName = function () {
  return this.name;
};
MyObject.prototype.getMessage = function () {
  return this.message;
};




/****************************************************
 * console 
 ***************************************************/
function assert_value(){
  var errorMsg = "the # is not even";
  for(let number = 2; number <= 3; number++) {
    console.assert(number % 2 === 0, { number, errorMsg }); // Assertion failed: {number:3, errorMsg:'the # is not even'}
  }
}

console.info()
console.warn()
console.error()

(function A() {
  (function B() {
    console.trace();
  })()
})()

function indent_log(){
  console.group();
      console.log("Level 2");
      console.group();
          console.log("Level 3");
      console.groupEnd();
      console.log("level 2");
  console.groupEnd();
}

function stop_watch(){
  console.time("Mesure-Time"); // Set TimeWatch
  alert("Click to Start");
  console.timeLog("Mesure-Time"); // Start
  alert("Times flows.......");
  console.timeEnd("Mesure-Time"); // End
}

console.dir({a:1}) // >Object
console.dirxml(objXmlHtml)
console.table(["apples", "oranges", "bananas"]);
console.clear()




/****************************************************
 * encodeURI decodeURI
 ***************************************************/
encodeURI         (";,/?:@&=+$"); // ;,/?:@&=+$
encodeURIComponent(";,/?:@&=+$"); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
encodeURI         ("-_.!~*'()");  // -_.!~*'()
encodeURIComponent("-_.!~*'()");  // -_.!~*'()
encodeURI         ("#"); // #
encodeURIComponent("#"); // %23
encodeURI         ("ABC abc 123"); // ABC%20abc%20123 (the space gets encoded as %20)
encodeURIComponent("ABC abc 123"); // ABC%20abc%20123 (the space gets encoded as %20)
encodeURI('https://mozilla.org/?x=шеллы');                          // 'https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B'
decodeURI('https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B'); // 'https://mozilla.org/?x=шеллы'
decodeURIComponent('?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B'); // '?x=шеллы'



// JSON.parse(Text, ?Reviver)
JSON.parse("{'foo': 1}");    // SyntaxError. not allow single quotes
JSON.parse('{"foo" : 1, }'); // SyntaxError. not allow trailing commas
function reviver(key, value){
  return typeof value === 'number'
         ? value * 2
         : value
};
JSON.parse('{"A": 5, "B": "B"}', reviver); // {A: 10, B: 'B'}


// JSON.stringify(Value, ?Replacer, ?Space)
function replacer(key, value) {
  // Filtering out properties
  if (typeof value === 'string') {
    return undefined;
  }
  return value;
}
JSON.stringify({A: '1', B: '2', C: 3, D: '4', E: 5}, replacer, '\t'); // '{"week":45,"month":7}'
// {
// 	"C": 3,
// 	"E": 5
// }

value = { A: 1, B: '2', C: '3', D: '4',
  toJSON() {
    return {
      A: this.A,
      B: this.B
    };
  }
};
JSON.stringify(value); //{"A":1,"B":"2"}










// Intl the ECMAScript Internationalization API, 
date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));// Results below assume UTC timezone - your results may vary
// Specify default date formatting for language (locale)
console.log(new Intl.DateTimeFormat('en-US').format(date)); // expected output: "12/20/2020"
new Intl.DisplayNames(['en'], { type: 'region' }).of('JP') // 'Japan'
new Intl.DisplayNames(['en'], { type: 'region' }).of('US') // 'United States'
new Intl.DisplayNames(['en'], { type: 'region' }).of('KR') //  'South Korea'




