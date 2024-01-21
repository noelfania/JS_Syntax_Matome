## 생성하기

```jsx
new Array() == [];
Array()     == [];
Array(2)    == [undefined,undefined];
Array(1,2)  == [1,2];

// Array.of( ...args)
// >Return array
Array.of(3); // [3]
Array(3);    // [undefined, undefined, undefined]
Array.of(1, 2, 3); // [1, 2, 3]
Array(1, 2, 3); // [1, 2, 3]

// iterator-object   : {0: '가', 1: '나', 2: '다', length: 3, Symbol.iterator}
// array-like-object : {0: '가', 1: '나', 2: '다', length: 3}
// Array.from( iterator-object | array-like-object, function (element, index) { }, ?thisArg)
// Array.from( iterator-object | array-like-object).map( function (element, index) { }, ?thisArg)
// >Return array
Array.from( 'ABC'); // [ 'A', 'B', 'C' ]
Array.from( new Set(['A', 'B', 'C', 'A'])); // [ 'A', 'B', 'C' ]
Array.from( new Map([[1, 2], [2, 4], [4, 8]])); // [[1, 2], [2, 4], [4, 8]]
Array.from( { 0: '가', 1: '나', 2: '다', length: 3 });  // ['가', '나', '다']
Array.from( document.getElementsByTagName('img'), (e) => e.src);
Array.from( document.querySelectorAll('select option:checked'), ({e}) => e);
Array.from( [1, 2, 3], (e) => e*2 ); // [2, 4, 6]
Array.from( {length: 5}, (e, i) => i); // [0, 1, 2, 3, 4]

```

## 기본

```jsx
 Array.prototype.펑션.call( "array-like-object" );

// Array.isArray( value)
// better than instanceof
// >Return boolean
Array.isArray(Array.prototype); // true

// Array.prototype.length;
// >Return length
[1,2,3].length //3

// Array.prototype.at( index)
// >Return element
[9,8,7].at(-1); // 7
[9,8,7, , , ].at(-1); // undefined

// Array.prototype.toString()
// >Return string
[1, 2, 'a', '1a'].toString(); // '1,2,a,1a'

// Array.prototype.concat(...args)
// >Return array
[9,8,7,].concat({},[6,[4]]); // [ 9, 8, 7, {}, 6, [4] ]

// Array.prototype.join( separator)
// >Return string
['A','B','C'].join('+'); // A+B+C
(function (){
    Array.prototype.join.call(arguments, '+');
})(1,2,3); // 1+2+3

// Array.prototype.flat( depth )
// >Return array
[1, 2, , 4, 5].flat(); // [1, 2, 4, 5]
[1, 2, [3, 4]].flat(); // [1, 2, 3, 4]
[1, 2, [3, 4, [5, 6]]].flat(1); // [1, 2, 3, 4, [5, 6]]
[1, 2, [3, 4, [5, 6]]].flat(2); // [1, 2, 3, 4, 5, 6]
[1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]].flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Array.prototype.flatMap( function(element, index, array), ?thisArg)
// >Return array
[1, 2, [3], [4, 5], 6, []].flatMap(elem => elem); // [1, 2, 3, 4, 5, 6]
['A B C', '', 'D F'].flatMap((elem) => elem.split(' ')); // [ 'A', 'B', 'C', '', 'D', 'F' ]

```

## 순서변경

```jsx
// Array.prototype.sort( function compareFn(a, b) { })
// >Return modified-array
원형변경1 = [1, 30, 4, 10000021 ];
원형변경1.sort();                 // [1, 10000021, 30, 4]
원형변경1                         // [1, 10000021, 30, 4]
원형변경1.sort( (a, b) => a - b); // [1, 4, 30, 10000021]
원형변경1.sort(compareFn(a, b));  // [1, 4, 30, 10000021]
function compareFn(a, b) {
  if (a < b) {
    return -1;   // -1: go backward
  }
  if (a > b) {
    return 1;    //  1: go foreward
  }
  return 0;      //  0: stay
}

// Array.prototype.reverse()
// >Return modified-array
원형변경2 = [1, 30, 4, 10000021 ];
원형변경2.reverse();              // [10000021, 4, 30, 1]
원형변경2                         // [10000021, 4, 30, 1]

원형변경3 = {0:'다', 1: '나', 2: '가', length: 3};
Array.prototype.reverse.call( 원형변경3 ); // {0: '가', 1: '나', 2: '다', length: 3}
원형변경3                                  // {0: '가', 1: '나', 2: '다', length: 3}

```

## 추가삭제

```jsx
// Array.prototype.push( ...args )
// >Return length
원형변경1 = [1, 2];
원형변경1.push('가', '나'); // 4
원형변경1 // [1, 2, '가', '나']

// Array.prototype.pop()
// >Return poped-element | undefined
원형변경2 = [1, 2, '가'];
원형변경2.pop();           // '가'
원형변경2 // [1, 2]
Array.prototype.pop.call( { 0: '가', 1: '나', length: 2} ); // '나'

// Array.prototype.unshift( ...args)
// >Return length
원형변경3 = [1, 2];
원형변경3.unshift('가', '나'); // 4
원형변경3 // ['가', '나', 1, 2]

// Array.prototype.shift()
// >Return shifted-element | undefined
원형변경4 = ['가', '나', 1, 2];
원형변경4.shift(); // '가'
원형변경4 // ['나', 1, 2]

```

## 요소편집

```jsx
// Array.prototype.fill( element, startIndex|0, endIndex|length)
// >Return shallow-copy-array
원형변경 = [1, 2, 3];
원형변경.fill(4); // [4, 4, 4]
원형변경 // [4, 4, 4]
[1, 2, 3].fill(4, 1);             // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);          // [1, 4, 3]
[].fill.call({ length: 3 }, 4);   // {0: 4, 1: 4, 2: 4, length: 3}
AAA = Array(3).fill({}); // [{}, {}, {}]
AAA[0].가 = '가';              // [{ 가: '가' }, { 가: '가' }, { 가: '가' }]
BBB = new Array(3);
for (let i = 0; i < BBB.length; i++) { BBB[i] = new Array(4).fill(1); };
BBB //  [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]

// Array.prototype.copyWithin( copyTo, startIndex|0, endIndex|length)
// >Return shallow-copy-array
원형변경 = [1, 2, 3, 4, 5];
원형변경.copyWithin(-2); // [1, 2, 3, 1, 2]
원형변경 // [1, 2, 3, 1, 2]
[1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(-2, -3, -1); // [1, 2, 3, 3, 4]
[].copyWithin.call({length: 5, 4: '가'},0,4,5); // {0: '가', 4: '가', length: 5}

// Array.prototype.splice( startIndex, deleteCount, ...insertItems)
// 원형변경
// Return deleted-elements-array
원형변경1 = ['A', 'B', 'C', 'D', 'E'];
원형변경1.splice(3); // [ 'D', 'E']
원형변경1 // ['A', 'B', 'C']

원형변경2 = ['A', 'B', 'C', 'D', 'E'];
원형변경2.splice(3, 0); // [ ]
원형변경2 // ['A', 'B', 'C', 'D', 'E']

원형변경3 = ['A', 'B', 'C',       'D', 'E'];
원형변경3.splice(3, 0, 'F'); // [ ]
원형변경3 // ['A', 'B', 'C', 'F', 'D', 'E']

원형변경4 = ['A', 'B', 'C',       'D', 'E'];
원형변경4.splice(3, 1, 'F', 'G', 'H'); // ['D']
원형변경4 // ['A', 'B', 'C', 'F', 'G', 'H', 'E']

// Array.prototype.slice( startIndex, endIndex)
// >Return shallow-copy-array
['A', 'B', 'C', 'D',].slice(-3); // ['B', 'C', 'D']
['A', 'B', 'C', 'D',].slice(2);  // ['C', 'D']
['A', 'B', 'C', 'D',].slice(2,3); // ['C']
(function (){
  Array.prototype.slice.call(arguments,1); //['B', 'C', 'D']
})(...['A', 'B', 'C', 'D',]);

(function (){
  Array.prototype.slice.call(arguments,1); //['B', 'C', 'D']
})('A', 'B', 'C', 'D');
```

## 요소찾기

```jsx

// Array.prototype.find( function( element, index, array) { }, ?thisArg)
// >Return first-element | undefined
[{name: '가', age: 10},
{name: '나', age: 20},
{name: '나', age: 30}].find(({name,age},i,a)=> name==='나'); // { name: "나", age: 20 }

// Array.prototype.findIndex( function( element, index, array) { }, ?thisArg)
// >Return first-index | -1
[1, 2, 3, 3, 3].findIndex((element) => element > 2); // 2

// Array.prototype.indexOf( searchElement, fromIndex)
// >Return first-index | -1
['A', '가', '가', 'D'].indexOf('가', 1); // 1
['A', '가', '가', 'D'].indexOf('가', 2); // 2
['A', '가', '가', 'D'].indexOf('가', 5); // -1

// Array.prototype.findLast( function( element, index, array){ }, ?thisArg)
// >Return last-element | undefined
[{name: '가', age: 10},
{name: '나', age: 20},
{name: '나', age: 30}].findLast(({name,age},i,a)=> name==='나'); // { name: "나", age: 30 }

// Array.prototype.findLastIndex( function( element, index, array) { }, ?thisArg)
// >Return last-index | -1
[1, 2, 3, 3, 3].findLastIndex((element) => element > 2); // 4

// Array.prototype.lastIndexOf( searchElement, fromIndex)
// >Return last-index | -1
['A', '가', '가', 'D'].lastIndexOf('가', -2); // 2
['A', '가', '가', 'D'].lastIndexOf('가', -3); // 1
['A', '가', '가', 'D'].lastIndexOf('가', -4); // -1

// Array.prototype.includes( searchElement, fromIndex)
// fromIndex >= length : false
// -fromIndex > length : true
// searchElement : case-sensitive
// >Return boolean
['A', '가', '가', 'D'].includes('가');    // true
['A', '가', '가', 'D'].includes('가',-1); // false
(function (){
    Array.prototype.includes.call(arguments,'가'); // true
})(...['A', '가', '가', 'D']);

// Array.prototype.every( function( searchElement, index, array) {}, ?thisArg)
// >Return boolean
[1, 2, 3,].every(function(e,i,a){ return e>this.A}, { A:0 }) // true
(function(array가, array나){
  array나.every((e) => console.log(array가.includes(e))); // true
})([1, 2, 3, 4, 5, 6, 7], [5, 7, 6]);

// Array.prototype.some( function( searchElement, index, array) { }, ?thisArg)
// >Return boolean
[1, 2, 3].some( (e) => e > 10); // false

```

## 만능

```jsx

// Array.prototype.filter( function( searchElement, index, array) { }, ?thisArg)
// >Return shallow-copy-array
AAA = [1, 2, 3];
AAA.filter(function(e,i,a){ 
	if( e%this.A==0 ) return true; 
	if( e%this.A!=0 ) return false 
}, { A:2 } ); // [2]
AAA // [1,2,3]

// Array.prototype.map( function( element, index, array) { }, ?thisArg)
// >Return array
[1, 2, 3].map(e => Math.pow(e, 2)) // [1, 4, 9]
[ { name: '가', age: 10 },
  { name: '나', age: 20 },
  { name: '나', age: 30 }
].map(({ name, age}) => ({ [name] : age })); 
// [{가: 10}, {나: 20}, {나: 30}]
Array.prototype.map.call('ABC', (e) => e); // ['A', 'B', 'C']

// Array.prototype.forEach( function(element, index, array) { }, ?thisArg)
// no way to stop or break;
// no wait for promises
// >Return undefined
[1, 2, undefined, 3].forEach(function (ele){return console.log(this.A, ele)}, {A:'>>'});
[1, 2,          , 3].forEach(function (ele){return console.log(this.A, ele)}, {A:'>>'});

// Array.prototype.reduce( function(previousElement, currentElement, currentIndex, array) { }, initialElement)
// >Return ANY
[5, 10, 8].reduce((preE, e) => Math.max(preE, e), 3); // 10
AAA = ['A', 'B', 'C', 'D', 'A'];
AAA.reduce((preE, e) => {
  preE[e] ??= 0;
  preE[e]++;
  return preE;
}, {}); // {
        //   'A': 2,
        //   'B': 1,
        //   'C': 1,
        //   'D': 1
        // }
BBB = [
  { name: '가', age: 10 },
  { name: '나', age: 20 },
  { name: '다', age: 20 },
];
BBB.reduce((preE, e) => {
    const key = e['age'];
    preE[key] ??= [];
    preE[key].push(e);
    return preE;
  }, {}); // {
          //   10: [ {name: '가', age: 10}                         ],
          //   21: [ {name: '나', age: 20}, {name: '다', age: 20}  ],
          // }

// Array.prototype.reduceRight( function(previousElement, currentElement, currentIndex, array) { }, initialElement)
// >Return ANY
['1', '2', '3'].reduce     ((preE, e) => preE + e); // "123"
['1', '2', '3'].reduceRight((preE, e) => preE + e); // "321"

```

## Iterator

```jsx
// Array.prototype.entries()
// >Return iterator-object
iterator = ['A',  , 'C'].entries();
iterator.next();  // {value: [0, 'a'],   done: false}
for (let [index, element] of ['A',  , 'C'].entries()) { console.log(index, element); };
// 0 'A'
// 1 undefined
// 2 'C'

// Array.prototype.values()
// >Return iterator-object
iterator = ['A',  , 'C'].values();
iterator.next(); // { value: 'a',        done: false }
for (let value            of ['A',  , 'C'].values())  { console.log(value); };
// 'A'
// undefined
// 'C'

// Array.prototype.keys()
// >Return iterator-object
iterator = ['A',  , 'C'].keys();
iterator.next(); // { value: 0,          done: false}
for (let key              of ['A',  , 'C'].keys())    { console.log(key); };
// 0
// 1
// 2

```

