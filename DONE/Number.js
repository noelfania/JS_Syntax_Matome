// Number.prototype.valueOf()
new Number(42).valueOf()  //  42
(33).valueOf() // 33

//Number.parseInt(string, ?진수 | 10)
// string -> integer
Number.parseInt("0101", 2)          // 5
Decode = parseInt("CAFEBABE", 16);  // 3405691582
스트링 = Decode.toString(2);           // '11001010111111101011101010111110' BigInt()
Encode = parseInt(스트링, 2);          // 3405691582
Encode.toString(16);                // 'cafebabe'

// Number.prototype.toString( ?변환할진수 | 10)
// 진수변환
// integer -> integer
숫자 = 6;
숫자.toString();      // '6'
숫자.toString(2);     // '110'
(254).toString(16);  // 'fe'
(-10).toString(2);   // '-1010'
(-0xff).toString(2); // '-11111111'

// 유리수확인
// The value to be tested for finiteness.
Number.isFinite(Infinity);  // false
Number.isFinite(-Infinity); // false
Number.isFinite(0);         // true
Number.isFinite(2e64);      // true

// 수 판단
isNaN(NaN);       // true
isNaN(undefined); // true
isNaN({});        // true
isNaN(true);      // false
isNaN(null);      // false
isNaN(37);        // false
isNaN("37,5");    // true

// 정수확인
Number.isInteger(Infinity);  // false
Number.isInteger(-Infinity); // false
Number.isInteger(0);         // true
Number.isInteger(-100000);   // true
Number.isInteger('10');      // false

// 정수확인
// IEEE-754에 근거한 표현가능유효정수(2의53승)
Number.isSafeInteger(3);                    // true
Number.isSafeInteger(Math.pow(2, 53) - 1);  // true
Number.isSafeInteger(Math.pow(2, 53));      // false

// 실수추출
Number.parseFloat({ toString() { return "3.14" } }); // 3.14
Number.parseFloat(3.14);  // 3.14
Number.parseFloat('3.14'); // 3.14
Number.parseFloat('  3.14  '); // 3.14

// Number.prototype.toLocaleString([locales [, options]])
// 로컬라이징
숫자 = 123456.789;
숫자.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' } // → ￥123,457
숫자.toLocaleString('en-IN') // → 1,23,456.789

// Number.prototype.toPrecision(precision)
// 수의 길이제한
숫자 = 5.123456;
숫자.toPrecision()    // '5.123456'
숫자.toPrecision(5)   // '5.1235'
숫자.toPrecision(2)   // '5.1'
숫자.toPrecision(1)   // '5'

숫자 = 0.000123;
숫자.toPrecision()    // '0.000123'
숫자.toPrecision(5)   // '0.00012300'
숫자.toPrecision(2)   // '0.00012'
숫자.toPrecision(1)   // '0.0001'

// Number.prototype.toFixed(digits)
// 소수점이하 길이제한
숫자 = 12345.6789;
숫자.toFixed()       // Returns '12346': rounding, no fractional part
숫자.toFixed(1)      // Returns '12345.7': it rounds up
숫자.toFixed(6)      // Returns '12345.678900': additional 
2.449999999999999999.toFixed(1) // Returns '2.5': it rounds up as it less
-2.34.toFixed(1)       // Returns '-2.3': due to operator precedence,
(-2.34).toFixed(1)     // Returns '-2.3'

// Number.prototype.toExponential(fractionDigits)
// 지수표기법
// 7.77777e+2 = 777.777 x 10의 +2승
숫자 = 777.777;
숫자.toExponential();  // '7.77777e+2'
숫자.toExponential(2); // '7.78e+2'
