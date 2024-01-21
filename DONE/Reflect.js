/****************************************************
 * Reflect 인터셉터
 * Reflect is a built-in object that provides methods
 * for interceptable JavaScript operations. 
 ***************************************************/

// Reflect.set( target, propertyKey, value, receiver)
// Object
let obj = {}
Reflect.set(obj, 'prop', 1)  // true
obj.prop  // 1

// Array
let arr = ['A', 'A', 'A']
Reflect.set(arr, 2, 'B')  // true
arr[2]  // "B"
arr // ['A', 'A', 'B']

// It can truncate an array.
Reflect.set(arr, 'length', 1)  // true
arr  // ["A"]





