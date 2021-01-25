//IIFE

//1.why need IIFE
function myFn(){
    var a = 10;
    var b = 10;
    console.log(a + b);
}
myFn();

//2.variable scope
var test1 = 10;
let test2 = 11;
(function(){
    var test = 10;
})();
console.log(typeof test);//undefined

var test = 11;
(function(){
    var test = 10;
})();
console.log(test);//11

let test = 11;
(function(){
    let test = 10;
})();
console.log(test);//11

!function(value){
    console.log('hi',value);
}(20);

//3. define private props and public method
var Thing;
(function(){
    var privateScope = new WeakMap();
    let counter = 0;

    Thing = function() {
        this.someProperty = 'foo';

        privateScope.set(this, {
            hidden: ++counter,
        });
    };

    Thing.prototype.showPublic = function() {
        return this.someProperty;
    };

    Thing.prototype.showPrivate = function() {
        return privateScope.get(this).hidden;
    };
})();

console.log(typeof privateScope);
// "undefined"

var thing = new Thing();

console.log(thing);
// Thing {someProperty: "foo"}
// someProperty: "foo"
// __proto__:
// showPrivate: ƒ ()
// showPublic: ƒ ()
// constructor: ƒ ()
// __proto__: Object

thing.showPublic();
// "foo"

thing.showPrivate();
// 1