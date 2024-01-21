// Math.ceil( num )
// 올림
Math.ceil(7.004);  // 8
Math.ceil(-7.004); // -7

// Math.round( num )
// 반올림
Math.round(20.5);   //  21
Math.round(-20.5 ); // -20

// Math.floor( num )
// 버림
Math.floor(45.05);  //  45
Math.floor(-45.05); // -46

// Math.max(num0, num1, num2 ...)
// 최대값
Math.max(10, 20);   //  20
Math.max(-10, -20); // -10
Math.max(...[1, 2, 3]);
Math.max.apply(null, [1, 2, 3]);
[1, 2, 3].reduce((prev, v, i, a) => Math.max(prev, v), -Infinity); // 3

// Math.max(num0, num1, num2 ...)
// 최저값
Math.min(10, -20);

// Math.random()
// 0 과 1 사이 유리수
Math.random()

// 최소포함
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}
// 최소최대포함
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 거듭제곱
Math.pow(2, 10);   // 1024
Math.pow(4, 0.5);  // 2 (square root of 4)
Math.pow(8, 1/3);  // 2 (cube root of 8)

// 제곱근
Math.sqrt(9); // 3
Math.sqrt(2); // 1.414213562373095

// 소수점제거
Math.trunc(13.37);    // 13
Math.trunc(0.123);    //  0

// 절대값
Math.abs('-1');     // 1
Math.abs(-2);       // 2

// 음수양수판단
Math.sign(3);     //  1
Math.sign(-3);    // -1




