/// class AAA
class AAA {
  constructor() {}
  static name  = '가'
         name1 = '나'
  static aaa() {}
         bbb() {}
}
new AAA().constructor.name  // '가'
new AAA().constructor.name1 // undefined
new AAA().name1             // '나'
new AAA().constructor.aaa   // function aaa
new AAA().constructor.bbb   // undefined
new AAA().bbb               // function bbb



// Inherit
class Polygon {
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width  = width;
  }
  static fieldA = 'A.fieldA';
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
}
new Polygon(300, 400).sayName(); // Hi, I am a  Polygon.

class Square extends Polygon {
  constructor(length, who='Anonymous') {
    super(length, length);
    this.name = 'Square';
    this.who = who;
  }
  static {
    console.log(super.fieldA); // 'A.fieldA'
  }
  get area() {
    return this.height * this.width;
  }
  set area(value) {
    this.height = value ** 0.5;
    this.width = value ** 0.5;
  }
  introduce() {
    console.log(`Who am I?: ${this.who}`);
  }
}
square = new Square(5);
square.sayName(); // Hi, I am a  Square.
square.introduce();       // Who am I?: Anonymous
square.area // 25
square.area = 5;
square.area // 5.000000000000001



// Inherit
class myDate extends Date {
  getFormattedDate() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`;
  }
}
new myDate().getFormattedDate(); // '16-Aug-2022'


// 클컨펑뉴
// static defines a static method or property for a class
// # can only be read or written within the class body
class AAA {
  static #privateValue1 = 0;
         #privateValue2;
  
  
  constructor(){
    this.#privateValue2 = ++AAA.#privateValue1;
  }
  
  static a1 = 'a1';
         a2 = 'a2';

  static {
    AAA.prototype.sound1 = 'Good Sound 1'
  }

  static b1(x = {a2:0}){
    return 'b1' + x.a2;
  }
         b2(){
            console.info(AAA.b1());
            console.info(AAA.a1);
            console.info(this.a2);
            console.info(this.#privateValue2);
         } 

}
AAA.prototype.sound2 = 'Good Sound 1';

instance = new AAA();

instance.b2();
instance.sound1 // 'Good Sound 1'
instance.sound2 // 'Good Sound 2'
AAA.b1(instance);
AAA.a1; // 'a1'