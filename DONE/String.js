// String.prototype.toString()
new String('foo').toString() //  'foo'

// String.prototype.valueOf()           이건 코드말고 자바스크립튼 내부에서 주로 사용한다
new String('foo').toString() //  'foo'

// String.prototype[@@iterator]()
[...'ABC'] // ['A', 'B', 'C']

// String.prototype.at(index)
// 음수가능
스트링 = 'ABC';
스트링.at(2)  // 'C'
스트링.at(-1) // 'C'

// String.prototype.charAt(index)
// String.prototype.charCodeAt(index)
스트링 = 'ABC';
스트링.charAt(2) // 'C'
스트링.charAt(-1)    // ''
스트링.charCodeAt(2)  // 67
스트링.charCodeAt(-1) // NaN

// String.fromCharCode(num0, num1, num2, ...)
String.fromCharCode(65, 66, 67); // 'ABC'

// String.prototype.concat(str0, str1, str2, ...)
스트링1 = 'Hello';
스트링2 = 'World';
스트링1.concat(', ', 스트링2); // "Hello, World"

// String.prototype.toLowerCase()
// String.prototype.toUpperCase()
'ABC'.toLowerCase(); // 'abc'
'abc'.toUpperCase(); // 'ABC'
String.prototype.toUpperCase.call({ toString() {return 'abcdef'; } }); // 'ABCDEF'
({ toString() {return 'abcdef'; }, toUpperCase: String.prototype.toUpperCase }).toUpperCase(); // 'ABCDEF'



// String.prototype.substring(indexStart, indexEnd)
스트링 = 'Mozilla';
스트링.substring(2);     // 'zilla'
스트링.substring(2, 5);  // 'zil'

// 쓰지말기
'Mozilla'.substr(2, 3);     // 'zil'
스트링 = 'The quick brown fox jumps over the lazy dog.';
스트링.slice(31);     // 'the lazy dog.'
스트링.slice(4, 19);  // 'quick brown fox'
스트링.slice(-4);     // 'dog.'
스트링.slice(-9, -5); // 'lazy'

// String.prototype.split( separator, limit)
스트링 = 'The quick brown fox jumps over the lazy dog.';
스트링.split(' '); // ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog.']
스트링.split(' ', 3); // ['The', 'quick', 'brown']

// String.prototype.repeat( count)
'abc'.repeat(2)     // 'abcabc'
String.prototype.repeat.call({ toString() {return 'abc'; } }, 2); // 'abcabc'
({ toString: () => 'abc', repeat: String.prototype.repeat }).repeat(2) // 'abcabc' 



// String.prototype.startsWith(searchString, startPosition)
// Return Boolean
스트링 = 'Saturday night plans';
스트링.startsWith('Sat');     // true
스트링.startsWith('Sat', 3);  // false

// String.prototype.endsWith(searchString, ?searchLengthTill | length)
// Return Boolean
스트링 = 'ABC!';
스트링.endsWith('C!');    // true
스트링.endsWith('C!', 3); // false
스트링 = 'ABC!DEF!';
스트링.endsWith('C!', 4); // true

// String.prototype.includes(searchString, startPosition)
// Return Boolean
'Blue Whale'.includes('Blue');    // true
'Blue Whale'.includes('Blue', 0); // true
'Blue Whale'.includes('Blue', 1); // false

// String.prototype.indexOf(searchString, startPosition)
// Return index of first encounter | -1
'Blue Whale Blue'.indexOf('Blue');      // 0
'Blue Whale Blue'.indexOf('Blue', 1);   // 11
'Blue Whale Blue'.indexOf('Blue', -4);  // 11
'Blue Whale Blue'.indexOf('Blue', -99); // 11
'Blue Whale Blue'.indexOf('Blue', 99);  // -1

// String.prototype.lastIndexOf(searchString, searchLengthTill)
'Blue Whale Blue'.lastIndexOf('Whale', 3); // -1
'Blue Whale Blue'.lastIndexOf('Whale', 6); // 5

// String.prototype.search(regexp)
// Return index | -1
스트링 = 'The lazy dog. If the dog barked, was it really lazy?';
regex = /[^\w\s]/g;          // any character that is not a word character or whitespace
스트링.search(regex);         // 12
스트링[스트링.search(regex)]; // '.'




// String.prototype.matchAll( regexp | new RegExp(regexp, 'g') )
// String.prototype.match( regexp | new RegExp(regexp) )
// iterator
regexp = /t(e)(st(\d?))/g;
regexp.lastIndex = 1;
스트링 = 'test1test2';
스트링.matchAll(regexp); // iterator
[...스트링.matchAll(regexp)]; // [Array(4), Array(4)]
Array.from(스트링.matchAll(regexp), (ele) => `${regexp.lastIndex} ${ele[0]}`); //  ['1 test1', '1 test2']

// String.prototype.padStart(targetLength, ?padString)
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"

// String.prototype.padEnd(targetLength, ?padString )
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"

// String.prototype.trim()
'   Hello world!   '.trim()       // 'Hello world!'

// String.prototype.trimStart()
// trimLeft() is an alias
'   Hello world!   '.trimStart()  // 'Hello world!   '

// String.prototype.trimEnd()
// trimRight() is an alias
'   Hello world!   '.trimEnd()    // '   Hello world!'



// String.prototype.replace(pattern, replacement)
// $<Name>  Inserts the named capturing group where Name is the group name.
// $n  Inserts the nth (1-indexed) capturing group where n is a positive integer less than 100.
// $'  Inserts the portion of the string that follows the matched substring.
// $`  Inserts the portion of the string that precedes the matched substring.
// $&  Inserts the matched substring.
// $$  Inserts a "$"
"abc".replace(/(a)(b)(c)/, "$2"); // "b"
"abc".replace("", "_"); // "_abc"

'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer); // abc - 12345 - #$*%
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is non-digits
  // p2 digits
  // p3 non-alphanumerics
  return [p1, p2, p3].join(' - ');
}

// String.prototype.replaceAll(pattern, replacement)
'aabbcc'.replaceAll(/b/g, '.'); // "aa..cc"
"xxx".replaceAll("", "_"); // "_x_x_x_"
스트링 = "A hacker called ha.*er used characters AAA";
스트링.replace(/ha.*er/g, '[REDACTED]'); // 'A [REDACTED]s AAA'
스트링.replaceAll("ha.*er", '[REDACTED]'); // 'A hacker called [REDACTED] used characters AAA'




// Template String
// String.raw({ raw: '' }, ...substitutions)
String.raw({ raw: 'test' }, 0, 1, 2);       // 't0e1s2t'
String.raw({ raw: `<canvas>\n</canvas>` }); // '<canvas>\n</canvas>' 
String.raw`<canvas>\n</canvas>`;            // '<canvas>\\n</canvas>'
String.raw`C:\Development\profile\aboutme.html`; // C:\Development\profile\aboutme.html'

htmlFunc1 = (strings) => String.raw({ raw: strings });
htmlFunc1`<canvas>\n</canvas>`; // '<canvas>\n</canvas>'

htmlFunc2 = function (strings ,...substitutions) {
   //  substitutions.forEach( (v,i,a)=> {a[i] = v.replace('씨','님')}, null )
   substitutions = substitutions.map( (v,i,a)=> v.replace('씨','님'), null )
   return String.raw({ raw: strings },...substitutions);
}
sub1 = '노정훈씨';
sub2 = '아무개씨';
htmlFunc2`<canvas>${sub1}</canvas><p>${sub2}</p>`;

`header 
${ isLargeScreen() ? 
    '' : `icon-${item.isCollapsed ? 
                'expander' : 'collapser'
              }`
}`;
