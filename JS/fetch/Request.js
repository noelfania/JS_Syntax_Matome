
# Request 
new Request(input, ?options)

oldRequest = new Request(
    'https://github.com/mdn/content/issues/12959',
    { headers: { 'From': 'webmaster@example.org' } },
  );
  oldRequest.headers.get("From"); // "webmaster@example.org"
  const newRequest = new Request(
    oldRequest,
    { headers: { 'From': 'developer@example.org' } },
  );
  newRequest.headers.get('From'); // "developer@example.org"

myImage = document.querySelector('img');
const myRequest = new Request('flowers.jpg');
fetch(myRequest)
.then((response) => response.blob())
.then((response) => {
    const objectURL = URL.createObjectURL(response);
    myImage.src = objectURL;
});

myImage = document.querySelector('img');
const myHeaders = new Headers();
myHeaders.append('Content-Type', 'image/jpeg');
const myOptions = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default',
};
const myRequest = new Request('flowers.jpg', myOptions);
fetch(myRequest).then((response) => {
  // ...
});

const myOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'image/jpeg',
    },
    mode: 'cors',
    cache: 'default',
  };
const myRequest = new Request('flowers.jpg', myOptions);



### Request.body
// contains a ReadableStream with the body contents that have been added to the request. 
// Note that a request using the GET or HEAD method cannot have a body and null is return in these cases.
request = new Request('/myEndpoint', {
    method: 'POST',
    body: 'Hello world'
  });
request.body; // ReadableStream

### Request.bodyUsed
// boolean value that indicates whether the request body has been read yet.
request = new Request('/myEndpoint', {
    method: 'POST',
    body: 'Hello world'
});
request.bodyUsed; // false
request.text().then((bodyAsText) => {
    console.log(request.bodyUsed); // true
});


## Request.cache
// contains the cache mode of the request. 
//It controls how the request will interact with the browser's HTTP cache.


// Download a resource with cache busting, to bypass the cache
// completely.
fetch("some.json", { cache: "no-store" })
  .then((response) => { /* consume the response */ });

// Download a resource with cache busting, but update the HTTP
// cache with the downloaded resource.
fetch("some.json", { cache: "reload" })
  .then((response) => { /* consume the response */ });

// Download a resource with cache busting when dealing with a
// properly configured server that will send the correct ETag
// and Date headers and properly handle If-Modified-Since and
// If-None-Match request headers, therefore we can rely on the
// validation to guarantee a fresh response.
fetch("some.json", { cache: "no-cache" })
  .then((response) => { /* consume the response */ });

// Download a resource with economics in mind!  Prefer a cached
// albeit stale response to conserve as much bandwidth as possible.
fetch("some.json", { cache: "force-cache" })
  .then((response) => { /* consume the response */ });

// Naive stale-while-revalidate client-level implementation.
// Prefer a cached albeit stale response; but update if it's too old.
// AbortController and signal to allow better memory cleaning.
// In reality; this would be a function that takes a path and a
// reference to the controller since it would need to change the value
let controller = new AbortController();
fetch("some.json", { cache: "only-if-cached", mode: "same-origin", signal: controller.signal })
  .catch((e) => e instanceof TypeError && e.message === "Failed to fetch" ?
    ({ status: 504 }) : // Workaround for chrome; which fails with a TypeError
    Promise.reject(e))
  .then((res) => {
    if (res.status === 504) {
      controller.abort()
      controller = new AbortController();
      return fetch("some.json", { cache: "force-cache", mode: "same-origin", signal: controller.signal })
    }
    const date = res.headers.get("date"), dt = date ? new Date(date).getTime() : 0
    if (dt < Date.now() - 86_400_000) {
      // if older than 24 hours
      controller.abort()
      controller = new AbortController();
      return fetch("some.json", { cache: "reload", mode: "same-origin", signal: controller.signal })
    }

    // Other possible conditions
    if (dt < Date.now() - 300_000) // If it's older than 5 minutes
      fetch("some.json", { cache: "no-cache", mode: "same-origin" }) // no cancellation or return value.
    return res
  })
  .then((response) => { /* consume the (possibly stale) response */ })
  .catch((error) => { /* Can be an AbortError/DOMError or a TypeError */ });
  

### Request.credentials
// indicates whether the user agent should send or 
// receive cookies from the other domain in the case of cross-origin requests.
myRequest.credentials; // returns "same-origin" by default



### Request.headers
// Contains the Headers object associated with the request.
myHeaders = new Headers();
myHeaders.append('Content-Type', 'image/jpeg');
const myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};
const myRequest = new Request('flowers.jpg', myInit);
const myContentType = myRequest.headers.get('Content-Type'); // returns 'image/jpeg'



### Request.method
myRequest.method; // GET
### Request.mode
myRequest.mode; // returns "cors" by default
### Request.url
myRequest.url; // "https://mdn.github.io/fetch-examples/fetch-request/flowers.jpg"



## Request.arrayBuffer()
myArray = new Uint8Array(10);
const request = new Request('/myEndpoint', {
  method: 'POST',
  body: myArray
});
request.arrayBuffer().then((buffer) => {
  // do something with the buffer sent in the request
});



### Request.blob()
obj = { hello: 'world' };
const myBlob = new Blob(
  [JSON.stringify(obj, null, 2)],
  { type : 'application/json' },
);
const request = new Request('/myEndpoint', {
  method: 'POST',
  body: myBlob,
});
request.blob().then((myBlob) => {
  // do something with the blob sent in the request
});



### Request.clone()
new Request(myRequest)=== myRequest.clone(); 


### Request.formData()
formData = new FormData();
const fileField = document.querySelector('input[type="file"]');
formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);
const request = new Request('/myEndpoint', {
  method: 'POST',
  body: formData
});
request.formData().then((data) => {
  // do something with the formdata sent in the request
});




### Request.json()
obj = {hello: 'world'};
const request = new Request('/myEndpoint', {
  method: 'POST',
  body: JSON.stringify(obj)
 });
request.json().then((data) => {
  // do something with the data sent in the request
});




### Request.text()
text = "Hello world";
const request = new Request('/myEndpoint', {
  method: 'POST',
  body: text
});
request.text().then((text) => {
  // do something with the text sent in the request
});

















