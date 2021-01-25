# Factory Function
<script>
var Counter = function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
};

var Counter1 = Counter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();

var counter = function(){
    let i = 0;
    return {
        get: function(){
            return i;
        },
        set: function(val){
            i = val;
        },
        increment: function(){
            i++;
        }
    }
}
var newCounter = counter();
console.log(newCounter.get());
newCounter.set(5);
newCounter.increment();

//Object 
function Person (firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}
var person = new Person("Tony", "Li");
delete person1.firstName;
</script>

# Constructor Function
pascal naming convention two patterns
frist letter uppercse
## constructor build-in
## super
<script>
class Person {
    // private name; only TS file
    constructor(name){
        this.name = name;
    }
    walk() {
        console.log("walk");
    }
}
class Teacher extends Person {
    constructor(name, degree) {
        super(name);
        this.degree = degree;
    }
    teach() {
        console.log("teach");
    }
}

var CounterObject = function() {
    console.log("this", this); // new keyword current obj
    // create empty {} then return {}
    let privateCounter = 0;
    let changeBy = function (val) {
        privateCounter += val;
    }
    
    this.increment = function() {
        changeBy(1);
    },
    this.decrement = function() {
        changeBy(-1);
    },
    this.value = function() {
        return privateCounter;
    }
    
};

const Counter1 = new CounterObject();

console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
</script>

# call apply bind
<script>
var obj = { num: 2 }; 

var addToThis = function (a, b, c) {
    return this.num + a + b + c;  
}

console.log(addToThis.call(obj, 1, 2, 3));

var arr = [1, 2, 3];
console.log(addToThis.apply(obj, arr));

var bond = addToThis.bind(obj);
console.log(bond(1, 2, 3));

function Circle(radius) {
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    }
}

Circle.call({}, 1);
Circle.apply({}, [1, 2, 3]);
// {} target this
const another = new Circle(1);

const person = {
    name: "Mosh",
    walk() {
        console.log(this);
    }
};
person.walk();

const walk = person.walk.bind(person);
// 把一个对象的this传给另一个
walk();
</script>

# Getter Setter
<script>
    const person = {
        firstName: 'Mosh',
        lastName: 'Li',
        get fullName() {
            return `${person.firstName} ${person.lastName}`
        },
        set fullName(value) {
            const parts = value.split(' ');
            this.firstName = parts[0];
            this.lastName = parts[1];
        }
    };
    
    person.fullName = 'Tony Li';
    console.log(person.fullName);
</script>

## object clone
1. for in
2. assign
const circle = {
    radius: 1,
    draw() {
       console.log('draw');
    }
};
const another = Object.assign({}, circle);
3. spread operator
const another = { ...circle };



