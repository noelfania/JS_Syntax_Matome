/****************************************************
 * Comma operator (,)
 * evaluates(from left to right) and returns the value of the last operand
 ***************************************************/
x = 1;
x = (x++, x); // 2
x = (2, 3);   // 3
x = 0; (x += 1, x); // the same as return ++x;
{
  let a, b, a1, b1, c, d, rest, pop, push;
}


/****************************************************
 * Conditional (ternary) operator ( ? : )
 ***************************************************/
function condition() {
  return  condition1 ? value1
        : condition2 ? value2
        : condition3 ? value3
        : value4;
}
function condition() {
    if (condition1) {
        return value1;
    } else if (condition2) {
        return value2;
    } else if (condition3) {
        return value3;
    } else {
        return value4;
    }
}


/****************************************************
 * parentheses ( ... ) around the assignment statement are required 
 * when using object literal destructuring assignment without a declaration.
 ***************************************************/
({ a, b } = obj); // brackets are required
({ a: a1, b: b1 } = obj);
({ a: a1 = aDefault, b = bDefault } = obj);
({ a, b, ...rest } = obj);
({ a: a1, b: b1, ...rest } = obj);


/****************************************************
 * Destructuring Assignment
 ***************************************************/
var { a, ...others } = { a: 1, b: 2, c: 3 };
others // { b: 2, c: 3 }

var [a, ...others] = [1, 2, 3];
others // [2, 3]


var arr = [1, 2, 3];
[arr[2], arr[1]] = [arr[1], arr[2]];
arr // [1, 3, 2]

var [a, , b] = [1, 2, 3]
a // 1
b // 3

var { a: aa = 10, b: bb = 5 } = { a: 3 };
aa // 3
bb // 5


var user = {
    id: 123,
    displayName: 'jdoe',
    fullName: {
      firstName: 'John',
      lastName: 'Doe',
    },
  };
function userId({ id }) {
    return id;
}
userId(user); // 123

function userDisplayName({ displayName: dname }) {
    return dname;
}
userDisplayName(user); // `jdoe`

function whois({ displayName, fullName: { firstName: name } }) {
    return `${displayName} is ${name}`;
}
whois(user);  // "jdoe is John"



function drawChart({ size = 'big', coords = { x: 0, y: 0 }, radius = 25 } = {}) {
    console.log(size, coords, radius);
}
drawChart({
  coords: { x: 18, y: 30 },
  radius: 30,
});
// big {x: 18, y: 30} 30


/****************************************************
 * Nested object and array destructuring
 ***************************************************/
var metadata = {
    title: 'Scratchpad',
    translations: [
      {
        locale: 'de',
        localizationTags: [],
        lastEdit: '2014-04-14T08:43:37',
        url: '/de/docs/Tools/Scratchpad',
        title: 'JavaScript-Umgebung',
      },
    ],
    url: '/en-US/docs/Tools/Scratchpad',
  };
  var {
    title: englishTitle, // rename
    translations: [
      {
        title: localeTitle, // rename
      },
    ],
  } = metadata;
  console.log(englishTitle); // "Scratchpad"
  console.log(localeTitle);  // "JavaScript-Umgebung"

/****************************************************
 * For of iteration and destructuring
 ***************************************************/
var people = [
    {
      name: 'Mike Smith',
      family: {
        mother: 'Jane Smith',
        father: 'Harry Smith',
        sister: 'Samantha Smith',
      },
      age: 35,
    },
    {
      name: 'Tom Jones',
      family: {
        mother: 'Norah Jones',
        father: 'Richard Jones',
        brother: 'Howard Jones',
      },
      age: 25,
    }
  ];
  for (var { name: n, family: { father: f } } of people) {
    console.log(`Name: ${n}, Father: ${f}`);
  }
  // "Name: Mike Smith, Father: Harry Smith"
  // "Name: Tom Jones, Father: Richard Jones"

/****************************************************
 * Computed object property names and destructuring
 ***************************************************/
var key = 'z';
var { [key]: foo } = { z: 'bar' };
console.log(foo); // "bar"


2 ** 3   // 8
3 ** 2   // 9

2 ** 3 ** 2   // 512
2 ** (3 ** 2) // 512
(2 ** 3) ** 2 // 64


/****************************************************
 * Immediately Invoked Function Expression (IIFE)
 ***************************************************/
(function () {
    console.log('Code runs!');
})();
  
// or

!function () {
    console.log('Code runs!');
}();

/****************************************************
 * Importing defaults
 ***************************************************/
(async () => {
    if (somethingIsTrue) {
      var {
        default: myDefault,
        foo,
        bar,
      } = await import("/modules/my-module.js");
    }
  })();



/****************************************************
 * Importing on-demand in response to user action
 ***************************************************/
  var main = document.querySelector("main");
  for (var link of document.querySelectorAll("nav > a")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
  
      import("/modules/my-module.js")
        .then((module) => {
          module.loadPageInto(main);
        })
        .catch((err) => {
          main.textContent = err.message;
        });
    });
  }


/****************************************************
 * Importing different modules based on environment
 * In processes such as server-side rendering, 
 * you may need to load different logic on server or in browser 
 * because they interact with different globals or modules 
 * (for example, browser code has access to web APIs like document and navigator, 
 * while server code has access to the server file system).
 * You can do so through a conditional dynamic import.
 ***************************************************/
  let myModule;

  if (typeof window === "undefined") {
    myModule = await import("module-used-on-server");
  } else {
    myModule = await import("module-used-in-browser");
  }


/****************************************************
 * prop in object
 ***************************************************/
var mycar = {make: 'Honda', model: 'Accord', year: 1998}
delete mycar.make
'make' in mycar   // returns false

var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple']
delete trees[3]
3 in trees  // returns false



/****************************************************
 * Logical AND assignment; expr1 &&= expr2
 * (x &&= y) operator only assigns if x is truthy.
 ***************************************************/
let a = 1;
let b = 0;
a &&= 2;
console.log(a);// expected output: 2
b &&= 2;
console.log(b);// expected output: 0

x &&= y // Same As =>
x && (x = y);


/****************************************************
 * Logical nullish assignment; expr1 ??= expr2
 * The logical nullish assignment (x ??= y) operator only assigns if x is nullish (null or undefined).
 ***************************************************/
var a = { duration: 50 };
a.duration ??= 10;
console.log(a.duration);// expected output: 50
a.speed ??= 25;
console.log(a.speed);// expected output: 25

x ??= y // Same As => 
x ?? (x = y);

/****************************************************
 * Logical OR assignment;  expr1 ||= expr2
 * The logical OR assignment (x ||= y) operator only assigns if x is falsy.
 ***************************************************/
var a = { duration: 50, title: '' };

a.duration ||= 10;
console.log(a.duration);// expected output: 50

a.title ||= 'title is empty.';
console.log(a.title);// expected output: "title is empty"

document.getElementById('lyrics').textContent ||= 'No lyrics.'
x ||= y // Same As =>
x || (x = y);


/****************************************************
 * new.target in function calls
 ***************************************************/
function Foo() {
    if (!new.target) { throw 'Foo() must be called with new' }
    console.log('Foo instantiated with new')
  }
  
  new Foo()  // logs "Foo instantiated with new"
  Foo()      // throws "Foo() must be called with new"

/****************************************************
 * Nullish coalescing operator; leftExpr ?? rightExpr
 * returns its right-hand side operand 
 * when its left-hand side operand is null or undefined, 
 * and otherwise returns its left-hand side operand.
 ***************************************************/
var foo = null ?? 'default string';
console.log(foo);// expected output: "default string"

var baz = 0 ?? 42;
console.log(baz);// expected output: 0



/****************************************************
 * Method definitions
 ***************************************************/
var o = {
    property: function (parameters) {},
    get property() {},
    set property(value) {},
  }

// Shorthand method names
var o = {
    property(parameters) {},
}
// generator methods.
var o = {
    generator: function* () {
      // …
    },
  };
var o = {
    *generator() {
        // …
    },
};


// Computed property names
let i = 0;
var a = {
  [`foo${++i}`]: i,
  [`foo${++i}`]: i,
};

console.log(a.foo1); // 1
console.log(a.foo2); // 2

// Spread properties
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };
var clonedObj = { ...obj1 };// Object { foo: "bar", x: 42 }
var mergedObj = { ...obj1, ...obj2 };// Object { foo: "baz", x: 42, y: 13 }


/****************************************************
 * Optional chaining (?.)
 ***************************************************/
obj.val?.prop
obj.val?.[expr]
obj.func?.(args)

var adventurer = {
    name: 'Alice',
    cat: {
      name: 'Dinah'
    }
  };
  
  var dogName = adventurer.dog?.name;
  console.log(dogName);  // expected output: undefined
  
  console.log(adventurer.someNonExistentMethod?.());  // expected output: undefined
  
  var customer = {
    name: "Carl",
    details: { age: 82 }
  };
  var customerCity = customer?.city ?? "Unknown city";


document['createElement']('pre') ===  document.createElement('pre')



function f1() {
    return this;
}
// In a browser:
f1() === window; // true
// In Node:
f1() === globalThis; // true

function f2() {
    'use strict'; // see strict mode
    return this;
}
f2() === undefined; // true


/****************************************************
  <a href="javascript:void(0);">
    Click here to do nothing
  </a>

  <a href="javascript:void(document.body.style.backgroundColor='green');">
    Click here for green background
  </a>
 ***************************************************/

/****************************************************
 * yield* expression is used to delegate to another generator or iterable object.
 * Delegating to another generator
 ***************************************************/
function* g1() {
    yield 2;
    yield 3;
    yield 4;
  }
  
  function* g2() {
    yield 1;
    yield* g1();
    yield 5;
  }
  
  var iterator = g2();
  
  console.log(iterator.next()); // {value: 1, done: false}
  console.log(iterator.next()); // {value: 2, done: false}
  console.log(iterator.next()); // {value: 3, done: false}
  console.log(iterator.next()); // {value: 4, done: false}
  console.log(iterator.next()); // {value: 5, done: false}
  console.log(iterator.next()); // {value: undefined, done: true}

/****************************************************
 * Other Iterable objects
 ***************************************************/
function* g3(...args) {
  yield* [1, 2];
  yield* '34';
  yield* args;
}

var iterator = g3(5, 6);
// yield* can also yield other kinds of iterables
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: "3", done: false}
console.log(iterator.next()); // {value: "4", done: false}
console.log(iterator.next()); // {value: 5, done: false}
console.log(iterator.next()); // {value: 6, done: false}
console.log(iterator.next()); // {value: undefined, done: true}









// Swap Value
var [a,b] = [1,2];
var [b,a] = [a,b];

// 'in' Operator
'a' in {a:1, b:2}  // true
'c' in {a:1, b:2}  // false
0   in [1, 2]        // true
2   in [1, 2]        // false

/* Spread expression
*/
object_merge = { x: 1, ...( {y: 2, z: 3} ) }; // {x: 1, y: 2, z: 3}
array_concat = [ 1, ...[2, 3] ]; // [1, 2, 3]

// undefined
x === undefined
x === void 0
typeof x === 'undefined'

// Infinity is greater than any other number.
Infinity > 9999999   // true
-Infinity < -9999999 // true


// do-while
result = '';
i = 0;
do {
  i += 1;
  result += `${i} `;
}
while (i > 0 && i < 5);
result // '1 2 3 4 5 '



// try-catch-finally
function try_catch(){
  try {
    throw new Error('oops');
  } catch (err) {
    console.error('inner', err.message);  // inner oops
    throw new Error('Failed in some way', { cause: err }); // Uncaught Error: Failed in some way
  } finally {
    console.log('finally');
  }
}

