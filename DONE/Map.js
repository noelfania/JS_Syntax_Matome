// Map
// iteration
map1 = new Map();
map1.set('a', 1);
map1.set('b', 2);
map1.has('a'); // true
map1.get('a'); // 1
map1.size // 2
map1.delete('b'); // true
map1.size; // 1
map1.clear(); // 0

// @@iterator
myMap = new Map();
myMap.set('0', 'foo');
myMap.set(1, 'bar');
myMap.set({}, 'baz');

// Map.prototype.[Symbol.iterator]
mapIter = myMap[Symbol.iterator]()
mapIter.next().value // ["0", "foo"]
mapIter.next().value // [1, "bar"]
mapIter.next().value // [Object, "baz"]

// Map.prototype.keys()
mapKeys = myMap.keys();
mapKeys.next().value; // "0"
mapKeys.next().value; // 1
mapKeys.next().value; // Object

// Map.prototype.values()
mapValues = myMap.values();
mapValues.next().value; // "foo"
mapValues.next().value; // "bar"
mapValues.next().value; // "baz"

// Map.prototype.entries()
mapEntries = myMap.entries();
mapEntries.next().value; // ["0", "foo"]
mapEntries.next().value; // [1, "bar"]
mapEntries.next().value; // [Object, "baz"]


// Map.prototype.forEach(function(value, key, map) { /* … */ }, thisArg)
new Map([['foo', 3], ['bar', {}], ['baz', undefined]])
.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// "foo: = 3"
// "bar: = [object Object]"
// "baz: = undefined"


// for of
for (const [key, value] of new Map([['foo', 3], ['bar', {}], ['baz', undefined]])) {
  console.log(`${key}: ${value}`)
}
// "foo: = 3"
// "bar: = [object Object]"
// "baz: = undefined"



// MAP to JSON.stringify
function replacer(key, value) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}
// MAP to JSON.parse
function reviver(key, value) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

originalValue = [
new Map([['a', {
    b: {
    c: new Map([['d', 'text']])
    }
}]])
];
str = JSON.stringify(originalValue, replacer);
newValue = JSON.parse(str, reviver);

