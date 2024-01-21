/****************************************************
 * new Function(args0, args1, ... , functionBody)
 ***************************************************/
(new Function('a', 'b', 'return a + b'))(2, 6); // 8

/****************************************************
 * Function.prototype.name
 ***************************************************/
(function AAA(){}).name; // 'AAA'

/****************************************************
 * Function.prototype.length
 ***************************************************/
(() => {}).length // 0
((...args)/*spread*/=> {}).length // 0
((a, b) => {}).length // 2
((a, b, c = 0)/*default*/=> {}).length // 2

/****************************************************
 * Function.prototype.toString()
 ***************************************************/
(function foo/* a comment */() { return 'a' }).toString(); // function foo/* a comment */() { return 'a' }

/** Destructuring with parameters
***/
AAA = ([a, b] = [1, 2]) => a + b , AAA() // 3
AAA = ({ a, b } = {a: 1, b: 2}) => a + b, AAA() // 3

/****************************************************
 * Function.prototype.prototype 펑콜디프뉴
 ***************************************************/
function AAA({a}) { 
  this.a = {a};
};
function BBB({a, b}) {
  AAA.call(this, {a});
  this.b = b;
};
BBB.prototype.CCC = function(c){console.log(this.a, this.b, c)};
new BBB({a:1, b:2}).b; // 2
(new BBB({a:1, b:2})).CCC(3); // 1 2 3

/****************************************************
 * Function.prototype.apply(thisObj, [arg0, arg1 ,...])
 ***************************************************/
AAA = (a,b)=>{console.log(a,b)};
AAA.apply(null, [1,2,3]); // 1 2
AAA.apply(null, { '0': 1, '1': 2 , '2': 3 , 'length': 3 }); // 1 2
AAA(...[1,2,3]); // 1 2

function AAA2(){
    function AAA(a,b){console.log(a,b)};
    return AAA(...arguments);
};
AAA2(1, 2, 3); // 1 2

AAA = [0], AAA.push.apply(AAA, [1, 1]);
AAA // [0, 1, 1]
AAA.push(...[2, 2]);
AAA // [0, 1, 1, 2, 2]

AAA = [0], Array.prototype.push.apply(AAA, [1, 1]); 
AAA // [0, 1, 1]

/****************************************************
 * Function.prototype.bind( thisArg, arg1, arg2 ,...arg3)
 ***************************************************/
AAA = (...args)=>{return args};
AAA.bind(null, 1)(1, 2, 3); // [1, 1, 2, 3]

AAA = [0], PUSH = Function.prototype.apply.bind(Array.prototype.push);
PUSH(AAA ,[1, 1]); // [0, 1, 1]
AAA  // [0, 1, 1]

/****************************************************
 * Function In Object Pattern
 ***************************************************/
obj = {
    // this, arguments
    a: 1,
    b: ()=>console.log(this.a, this, ),
    c() {console.log(this.a, this, ...arguments)},
    
    // Computed property name
    get ['expr']() { return 1; },
    ['expr' + 2]() { return 2; },

    //Object Accessors (Getters and Setters)
    language: 'en',
    get lang() {
      return this.language;
    },
    set lang(lang) {
      this.language = lang;
    }
};
obj.b(); // undefined Window
obj.c(3); // 1  obj-properties  3

obj.expr;    // 1
obj.expr2(); // 2

obj.lang = 'kr' // set
obj.lang        // get


/****************************************************
 * Module Functional Design Pattern
 ***************************************************/
counter = (function () {
  _privateCounter = 0;
  function changeBy(val) {
    _privateCounter += val;
  };
  return {
    increment() {
      changeBy(1);
    },
    decrement() {
      changeBy(-1);
    },
    get value() {
      return _privateCounter;
    },
  };
})();


/****************************************************
 * Closure Scope Chain Pattern
 * global scope
 ***************************************************/
d = 4, function sum(a) {
  return function (b) { // outer functions scope
    return function (c) { // local scope
      return a + b + c + d;
    };
  };
};
sum(1)(2)(3); // 10

d = 4, sum=(a)=>(b)=>(c)=>a + b + c + d;
sum(1)(2)(3); // 10

/****************************************************
 * AsyncGenerator * (1)
 ***************************************************/
async function* asyncGen() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await new Promise((resolve) => {setTimeout(() => resolve(3), 2000); })
};

async function AAA() {
  a = '';
  for await (const val of asyncGen()) {
    a += val;
  };
  console.log(a);
};
AAA(); // 123

AAA2 = asyncGen();
AAA2.next().then((res) => console.log(res)); // {value: 1, done: false}
AAA2.next().then((res) => console.log(res)); // {value: 2, done: false}
AAA2.next().then((res) => console.log(res)); // {value: undefined, done: true}

/****************************************************
 *  AsyncGenerator * (2)
 ***************************************************/
async function* asyncGen(step) {
  await new Promise((resolve,reject) => setTimeout(reject, 10));
  yield step;
};
AAA = asyncGen(2);
AAA.next()
.then((res) => {
  console.log(res); // {value: 2, done: false}
  return AAA.next();
})
.then((res) => {
  console.log(res); // {value: undefined, done: true}
  return AAA.next();
})


/****************************************************
 * Async/Await
 ***************************************************/
async function AAA() {
  await 1;
}
//=> It is also equivalent to:
function AAA() {
  return Promise.resolve(1);
}

/****************************************************
 * Async/Await / Try/Catch
 ***************************************************/
function AAA() {
  return new Promise(function(resolve, reject){reject('error')});
};
try {
    await AAA();
} catch (e) {
    console.log('Error occurred', e);
};

/****************************************************
 * Functional recursive
 ***************************************************/
function rFact(num){ // factorial
  if (num === 0){
    return 1; 
  }
  else{ 
    return num * rFact( num - 1 ); 
  }
}
rFact(3) // 6

function rfnc(num){ // max final sqrt
  var s = Math.sqrt(num, 2)
  if(Number.isInteger(s)){
    console.log('>> ' + s);
    return;
  }
  else{
    return rfnc(num-1)
  }
}
rfnc(5) // 2