https://example.org:8080/foo/bar?q=baz#bang

https: // protocol

example.org:8080 // host

example.org // hostname

8080 // port

/foo/bar // pathname

?q=baz // search

#bang // hash


// location: https://developer.mozilla.org:8080/en-US/search?q=URL#search-results-close-container
const loc = document.location;
console.log(loc.href);      // https://developer.mozilla.org:8080/en-US/search?q=URL#search-results-close-container
console.log(loc.protocol);  // https:
console.log(loc.host);      // developer.mozilla.org:8080
console.log(loc.hostname);  // developer.mozilla.org
console.log(loc.port);      // 8080
console.log(loc.pathname);  // /en-US/search
console.log(loc.search);    // ?q=URL
console.log(loc.hash);      // #search-results-close-container
console.log(loc.origin);    // https://developer.mozilla.org:8080

location.assign('http://another.site') // load another page




Percent-encoding // ' '	 -> %20


// after navigating to the given URL, the current page will not be saved 
// in session history — meaning the user won't be able to use the back button to navigate to it.
location.replace()


// for URL using the http or https, the scheme followed by '://', followed by the domain, followed by ':', followed by the port (the default port, 80 and 443 respectively, if explicitly specified);
// for URL using file: scheme, the value is browser dependent;
// for URL using the blob: scheme, the origin of the URL following blob:. E.g "blob:https://mozilla.org" will have "https://mozilla.org".



// refresh
location.reload()

// read-only version of href
location.toString()













