// Set
mySet = new Set([1, 2, 3, 3, 4]);
mySet.add(1);
mySet.add('foo');
mySet.size;       // 2
mySet.has('foo'); // true
mySet.delete('foo'); // true
mySet.clear();
mySet.size;       // 0


// Set.prototype.values() alias for keys()
// iterator
mySet = new Set();
mySet.add('foo');
mySet.add('bar');
mySet.add('baz');
setValues = mySet.values();
setValues.next().value; // "foo"
setValues.next().value; // "bar"
setValues.next().value; // "baz"


// Set.prototype.entries()
// iterator
mySet = new Set();
mySet.add('foobar');
mySet.add(1);
mySet.add('baz');
setEntries = mySet.entries();
setEntries.next().value; // ["foobar", "foobar"]
setEntries.next().value; // [1, 1]
setEntries.next().value; // ["baz", "baz"]

// Set.prototype.forEach(function(value, key, set) { /* ... */ }, thisArg)
new Set(['foo', 'bar', undefined])
.forEach( function (value1, value2, set) {
    console.log(`[${value1}] = ${value2}`);
});
// [foo] = foo
// [bar] = bar
// [undefined] = undefined


// for of
for (const entry of new Set(['foo', 'bar', undefined])) {
    console.log(entry);
}
// [foo] = foo
// [bar] = bar
// [undefined] = undefined



