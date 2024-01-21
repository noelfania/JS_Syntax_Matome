
# Headers
// To overwrite the old value with a new one, use Headers.set
for (const p of myHeaders){}
new Headers(?init)

const httpHeaders = { 'Content-Type' : 'image/jpeg', 'X-My-Custom-Header' : 'Zeke are cool' };
const myHeaders = new Headers(httpHeaders);

const headers = [
    ['Set-Cookie', 'greeting=hello'],
    ['Set-Cookie', 'name=world']
  ];
  const myHeaders = new Headers(headers);

## .append(name, value)
## .get(name) // null | string
## has(name)  // A boolean value.
myHeaders = new Headers();

myHeaders.append('Content-Type', 'image/jpeg');
myHeaders.get('Content-Type'); // Returns 'image/jpeg'

myHeaders.append('Accept-Encoding', 'deflate');
myHeaders.append('Accept-Encoding', 'gzip');
myHeaders.get('Accept-Encoding'); // Returns 'deflate, gzip'

myHeaders.delete('Content-Type');
myHeaders.get('Content-Type'); // Returns null, as it has been deleted

myHeaders.has('Content-Type'); // Returns true

myHeaders.append('Vary', 'Accept-Language');

## .entries()
// Returns an iterator.

for (const pair of myHeaders.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
}


## .forEach()

myHeaders.forEach((value, key) => {
    console.log(`${key} ==> ${value}`);
})


## keys()
// Returns an iterator.
for (const key of myHeaders.keys()) {
    console.log(key);
 }


## set(name, value)
myHeaders.set('Accept-Encoding', 'deflate');
myHeaders.set('Accept-Encoding', 'gzip');
myHeaders.get('Accept-Encoding'); // Returns 'gzip'


## values()
// Returns an iterator.
for (const value of myHeaders.values()) {
    console.log(value);
 }

