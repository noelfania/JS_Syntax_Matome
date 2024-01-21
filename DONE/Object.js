/* Object.assign(targetObject, ...sources)
*  return target object.
*/
target = { a: 1, b: 2 }, source = { b: 4, c: 5 };
Object.assign(target, source);
console.log(target);   // { a: 1, b: 4, c: 5 }


/* Object.create(proto, propertiesObject)
*/
Object.create(null)// 어떠한 상속도 없이 깨끗한 오브제


/* Object.entries( object)
*  return [key, value] pairs
*  {a: 1} -> [a, 1]
*/
Object.entries( {  2: 'c' , 0: 'a', 1: 'b' } ); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
Object.entries( 'foo' ); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]
// Converting Object to Map
new Map(Object.entries( { a: 1, b: 2 } )); // Map(2) {"a" => 1, "b" => 2}

for (const [key, value] of Object.entries( { a: 1, b: 2 } )) {
  console.log(`${key}: ${value}`);
  // "a: 1"
  // "b: 2"
}

Object.entries({ a: 1, b: 2 }).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
    // "a: 1"
    // "b: 2"
});

for (const [key, value] of Object.entries( [1,2] )) {
  console.log(`${key}: ${value}`);
  // 0: 1
  // 1: 2
}



/* Object.fromEntries(iterable-array);
*  [a, 1] -> {a: 1}
*/
// Converting a MAP to Object
_Map = new Map( [['A', '1'], ['B', 2]]);
_Object = Object.fromEntries(_Map); // { A: '1', B: 2 }
// Converting a Array to Object
_Array = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
_Object = Object.fromEntries(_Array); // { 0: "a", 1: "b", 2: "c" }
// Converting Object to Object
_Object1 = { a: 1, b: 2, c: 3 };
_Object2 = Object.fromEntries(
                Object.entries(_Object1)
                    .map(([ key, val ]) => [ key, val * 2 ])
                ); // { a: 2, b: 4, c: 6 }


/* Object.keys(obj)
*  Object.values(obj)
*  non-object argument will be coerced to an object
*/
Object.keys(['a', 'b', 'c']); // ['0', '1', '2']
Object.keys({ 0: 'a', 1: 'b', 2: 'c' }); // ['0', '1', '2']
Object.values({ A: '1', B: 2 }); // ['1', 2]
Object.values({ 0: 'a', 1: 'b', 2: 'c' } ); // ['a', 'b', 'c']
Object.values('abc'); // ['a', 'b', 'c']

_Object = Object.create({}, {
    // getA is property which isn't enumerable
    getA: {
        value() { 
            return this.A; 
        }
    }
});

_Object = {
    getA: function value() { 
        return this.A; 
    }
};
_Object.A = 1;
Object.keys(_Object); // ['A']
Object.values(_Object); // [1]


/* Object.hasOwn(instance, prop)
*  return direct-property boolean
*/
_Object1 = { prop: 'exists'};
Object.hasOwn(_Object1, 'prop');     // true
Object.hasOwn(_Object1, 'toString'); // false
// in-Operator 
// return direct or inherited-property boolean
'prop'     in _Object1 // true
'toString' in _Object1 // true


/* Object.is( value1, value2)
*  같은걸 참조하고 있나 비교 할수있음
*/
_A = { a: 1 };
_B = { a: 1 };
Object.is(_A, _A); // true
Object.is(_A, _B); // false


/* Object.freeze(obj)
*  Object.isFrozen(obj)
*  요소의 값 변경불가
*/
obj = { ele: 1, inner: {} };
Object.freeze(obj);
obj.ele = 2; // Throws an error in strict mode
obj.ele;     // 1
obj.inner.a = 111;
obj.inner.a // 111


/* Object.seal(obj)
*  Object.isSealed(obj)
*  요소 의 값은 변경가능하지만 요소 갯수는 변경불가
*/
_Object1 = { a: 1 };
Object.seal(_Object1);
_Object1.a = 3;
console.log(_Object1.a);//   3
delete _Object1.a; // cannot delete when sealed
console.log(_Object1.a);//  3


/* Built-in iterator
  String
  Array
  TypedArray
  Map
  Set
  Intl.Segments 
  arguments
  some DOM collection types such as NodeList
*/
// String iterator
A = "hi";
typeof A[Symbol.iterator] // function 
A[Symbol.iterator]().next(); // { value: "h", done: false }


/* User-defined iterator 1
*/
obj_iterator = {
    [Symbol.iterator]() {
        let i = -1;
        let self = this;

        return {
            next() {
                return { value: self[++i], done: i === self.length }
            }
        }
    },
    ...( {0: 'A', 1: 'B', 2: 'C', length: 3} ) // array-like-object
};
for(let i of obj_iterator){
    console.info(i) // A B C
}


/* User-defined iterator 2
*/
obj_iterator = {
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; ++i) {
            yield this[i];
        }
    },
    ...( {0: 'A', 1: 'B', 2: 'C', length: 3} ) // array-like-object
};
for(let i of obj_iterator){
    console.info(i) // A B C
}

