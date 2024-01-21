new URL(url, ?base) // if [url] is absolute, [base] is ignored
new URL('/en-US/docs', "https://developer.mozilla.org/fr-FR/toto"); // 'https://developer.mozilla.org/en-US/docs'
new URL('http://www.example.com', );           // 'http://www.example.com/'
new URL('/en-US/docs');                        // Raises a TypeError exception as '/en-US/docs' is not a valid URL

// The Promise returned from fetch() won't reject on HTTP error status 
// even if the response is an HTTP 404 or 500. Instead, as soon as the server responds with headers, 
// the Promise will resolve normally 
// (with the ok property of the response set to false if the response isn't in the range 200–299), 
// and it will only reject on network failure or if anything prevented the request from completing.

// Unless fetch() is called with the credentials option set to include, 
// fetch():
// won't send cookies in cross-origin requests
// won't set any cookies sent back in cross-origin responses
// As of August 2018, the default credentials policy changed to same-origin. Firefox was also modified in version 61.0b13)


// access files through url

// This protects private data by preventing access and deletion. 
// For example, while an app or a page in http://www.example.com/app/ can access files from http://www.example.com/dir/, 
// because they have the same origin, 
// it cannot retrieve files from http://www.example.com:8080/dir/ (different port) or https://www.example.com/dir/ (different protocol).
















