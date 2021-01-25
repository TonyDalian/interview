
# Naming convention
1. Variables naming 
2. Cannot be a reserved keyword 
3. Should be meaningful
4. Cannot start with a number(1name) 
5. Cantnot contain a space or hyphon(-)
6. Are case-sensitive

# Type
   Primitives / Value Types        Reference Types  // change one, then change all
## typeof
   String                          Object
   Number                          Array
   Boolean                         Function
   undefined
   // let firstName; 
   // type is undefined
   null
   //clear value
   // type is object
   Symbol
   
   new String() // type of object

# Let Var Const
## var                                 let
   functional scope                    block scope
   hoisting declaration to the top     not hoisting
                                       can not redeclare in same scope
                                       not add to global scope
```js
    function hello(){};

    const sayHi = function() {};  //  not add to global scope

    var a = 1;
    if(true){
        var a = 2;
    }
    
    var b = 1;
    
    {
        let b = 2;
    }
    
    console.log('a', a);//a 2
    console.log('b', b);//b 1
    
    for(var i = 0; i < 10; i++){
        (function(i){
            setTimeout(() => {
               console.log(i)
            }, 1000);
        })(i);
    }
    
    for(let i = 0; i < 10; i++){
        setTimeout(() => {
            console.log(i)
        }, 1000);
    }
    // const can't be redefine, but props can redefine
    const obj1 = {
        name: "Joatman"
    };
    //obj1 = {}; error
    obj1.name = "Tony";
    console.log(obj1.name);
```
# Hoisting
Variable and function declaration
Moved to the top
Variables initializations
Function expressions
Not moved to the top
```js
    var a = 10;
    function outer(){
        var b = a;
        console.log("b==="+b);
        function inner(){
            var c = b;
            console.log("c==="+c);
            var b = 20;
        }
        inner();
    }
    outer();
    //b===10
    //c===undefined
    
    var a = 10;
    function outer(){
        var b = a;
        console.log("b==="+b);
        function inner(){
            var c = b;
            console.log("c==="+c);
            //var b = 20;
        }
        inner();
    }
    outer();
    //b===10
    //c===10
```

# Object
```js
    //get property
    let person = {
        name: 'Mosh',
        age: 30
    }
    // Dot Notation
    person.name = 'John';
    //Bracket Notation
    let selection = 'name';
    person[selection] = 'Mary';

    //遍历object keys
    const person = {name: "Tony", age: 33};
    //1 Object.keys
    console.log(Object.keys(person));
    for(const a of Object.keys(person)){
        console.log(a);
    }
    //forEach
    Object.keys(person).forEach(function(key){
        console.log(key+ '-keys-'+person[key])
    })
    //2 for in
    for(let a in person){
        console.log(a);
    }
    var object = person;
    for (const key in object) {
        const element = object[key];
        console.log('key', key)
        console.log('element', element)
    }
    //3 Object.entries for of
    for(const [key, value] of Object.entries(person)){
        console.log(key);
        console.log(value);
    }

    //4 getOwnPropertyNames forEach
    console.log(Object.getOwnPropertyNames(person));
    Object.getOwnPropertyNames(person).forEach(function(key){
        console.log(key+ '-getOwnPropertyNames-'+person[key])
    })
```

# String Template literals 
1. multi line strings 
2. embed expressions ${} cruly braces 
3. Back ticks ``

# Function
defaut parameters is arguments

# Rest spread operator
```js
    let displayColors = function (message, ...colors) {
        console.log(message);
        console.log(colors);
        for(let i in colors){
            console.log(colors[i]);
        }
    }
    let message = 'List of Colors';
    
    displayColors(message, 'Red', 'Blue', 'Green');
    
    let colorArray = ['Orange', 'Yellow', 'Indigo'];
    let newArray = [...colorArray, 'Red'];
    console.log(newArray);
    
    displayColors(message, ...newArray);
    
    let obj = {name: "Tony", age:17};
    let newObj = {...obj, title: "SE"};
    console.log(newObj);
```

# Object Literals obj key==value
```js
    let firstName = 'Tony';
    let lastName = 'Li';

    let person = {
        firstName,
        lastName
    };

    function createPerson(firstName, lastName, age) {
        let fullName = firstName + '' + lastName;
        return {
            firstName,
            lastName,
            fullName,
            isSenior(){
                return age>60;
            }
        }
    }

    let p = createPerson('Tony', 'Li', 23);
    console.log(p.isSenior());

    let ln = 'last name';
    let person = {
        'first name' : 'Tony',
        [ln]: 'Li'
    };

    console.log(person);
```

# Destructuring
```js
    let employee = ['Tony', 'Li', 'Male'];
    let [firstName, ...element] = employee;
    console.log(firstName);
    console.log(element);

    let employee= {
        firstName: 'Tony',
        lastName: 'Li'
    }

    let {firstName, lastName} = employee;
    console.log(firstName);
    console.log(lastName);

    // let {firstName : f, lastName: l} = employee;
    // console.log(f);
    // console.log(l);
```

# for loop (for in, for of)
```js
    let colors = ['Red', 'Blue', 'Green'];

    for(let index in colors){
        console.log(colors[index]);
    }

    for(let color of colors){
        console.log(color);
    }
```

# Class prototype staticMethod
not hoist, function is hoist
```js
    class Person {
        constructor(name) {
            this.name = name;
            console.log(this.name + "Constructor");
        }
        static staticMethod() {
            console.log("static method");
        }
        greet(){
            console.log("hello" + this.name);
        }
    }
    let p = new Person("Tony");
    console.log(p.greet == Person.prototype.greet); // true
    Person.staticMethod();
    p.greet();
```

# Inheritance super
```js
class Employee extends Person {
    constructor(name) {
        super(name);
        this.name = name;
        console.log(this.name + "Constructor");
    }
    greet(){
        return super.greet();
    }
}
```

# Set Map
Set 不会有重复的元素 list values
```js
    let newSet = new Set([1,2,3,4,4,4]);
    newSet.size // 4
    newSet.add("hello").add("world");
    newSet.has(1);//true
    newSet.delete(1);
```
##### WeakSet only add object, no primitive type 垃圾回收
```js 
    let set = new WeakSet();
    let key = {};
    set.add(key);
    console.log(set.has(key));
    key = null;
    console.log(set.size);
```
##### Map key可以是obj
```js
    let myMap = new Map();
    myMap.set('fname', 'Tony');
    let ob1 = {};
    myMap.set(ob1, 10);
    myMap.delete('fname');
    myMap.clear();

    let myMap = new Map([
        ['fname','Tony'],
        ['lname', 'Li']
    ])

    for(let [key, value] of myMap.entries()){
    console.log(`${key} -> ${value}`);
    }
    myMap.keys();
    myMap.values();
```

# forEach  Array Map Set
```js
var number = [2,4,6,8];
number.forEach(arrayFuction);
function arrayFuction(element, index, array) {}
function mapFuction(value, key, map) {}
```
# Array slice vs splice
slice
The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.
```js
var number = [2,4,6,8];
number.slice(0) //[2, 4, 6, 8]
number.slice(1) //[4, 6, 8]
number.slice(1,2) //[4]
```
splice (start, deleteCount, item1, item2, ...)
The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements

# high order function
Higher-order functions are functions that accept another function as an argument, return another function as a result, or both.
```js
// Example #1
const twice = (f, v) => f(f(v)) // add3(add3(7))
const add3 = v => v + 3 //10 -> 13
twice(add3, 7) // 13

function add (x, y) => x + y
function higherOrderFunction (x, callback)=> callback(x, 5)
higherOrderFunction(10, add) // 15

[1,2,3].map((i) => i + 5)

_.filter([1,2,3,4], (n) => n % 2 === 0 );

$('#btn').on('click', () =>
  console.log('Callbacks are everywhere')
)
```

# closure vs Higher-order vs curring
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

all curried functions are higher-order functions but not all higher-order functions are curried.
```js
function closure(a) { 
  return function trapB (b) {
    return function trapC(c) {
      return c * a + b; 
    }
  }
}
const multiply = (a) => {
    return (b) => {
      return a * b;
    }
}
const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(3)) // 6

const multiplyByThree = multiply(3);
console.log(multiplyByThree(6)); // 18

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}
function mean (a , b, c) {
    return (a + b + c) / 3
}
const curriedMean = curry(mean);
console.log(curriedMean(1,2,3))
console.log(curriedMean(1,2)(3))
console.log(curriedMean(1)(2)(3))
```

# Composing and Piping
Lodash compose pip
```js
const transform = compose(fn3,fa2,fn1);
const transform = pip(fn1,fa2,fn3);
transform(input);
trim = str => str.trim();
wrap = type => str => `<${type}>${str}</${type}>`;
toLowerCase = str => str.toLowerCase();

transform = pip(trim, toLowerCase, wrap("div"));
console.log(transform(input));
```

# Pure function reducer args -> result
一个纯函数是一个不依赖于且不改变其作用域之外的变量状态的函数，这也意味着一个纯函数对于同样的参数总是返回同样的结果。
1. No random values
2. No current data/time
3. No global state(Dom, files, db, etc)
4. No mutation of parameters
Benefits
1. self-documenting
2. Easily testable
3. Concurrency 并发
4. Cacheable

# deep and shallow copies
深拷贝 对象不相等 a != b
浅拷贝 对象相等
```js
const a = {
  en: 'Hello',
  de: 'Hallo',
  es: 'Hola',
  pt: 'Olà'
}
let b = a //浅拷贝 原始对象会改变
b.pt = 'Oi'
console.log(b.pt) // Oi
console.log(a.pt) // Oi
const a = {
  en: 'Bye',
  de: 'Tschüss'
}
let b = {...a} // 深拷贝 spread operator 
b.de = 'Ciao'
console.log(b.de) // Ciao
console.log(a.de) // Tschüss
const a = {
  en: 'Bye',
  de: 'Tschüss'
}
let b = Object.assign({}, a) //深拷贝 object.assign
b.de = 'Ciao'
console.log(b.de) // Ciao
console.log(a.de) // Tschüss
// Nested object 
// finale JSON.parse(JSON.stringify(obj))
const a = {
  foods: {
    dinner: 'Pasta'
  }
}
const b = {...a, foods: {...a.foods}}
let b = JSON.parse(JSON.stringify(a))

const a = [1,2,3]
let b = [...a]
b[1] = 4
console.log(b[1]) // 4
console.log(a[1]) // 2
// Array functions — map, filter, reduce
const a = [1,2,3]
let b = a.map(el => el)
b[1] = 4
console.log(b[1]) // 4
console.log(a[1]) // 2
//Array.slice
const a = [1,2,3]
let b = a.slice(0)
b[1] = 4
console.log(b[1]) // 4
console.log(a[1]) // 2
JSON.parse(JSON.stringify(someArray))
```
# html meta 
1. viewpoint
2. keywords
3. discription

# Css BEM
Block
Element
CSS class is formed as block name plus two underscores plus element name: .block__elem
Modifier
name plus two dashes: .block--mod or .block__elem--mod and .block--color-black with .block--color-red block--size-big block--shadow-yes
