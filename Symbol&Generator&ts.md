# Symbol
<script>
    let s4 = Symbol.for('RegSymbol');
    console.log(Symbol.keyFor(s4));

    let fname = Symbol('FirstName');
    let person = {
        [fname]: "Tony"
    }
    console.log(Object.getOwnPropertySymbols(person));
}
</script>
# Iterables and Iterators
<script>
    let iterable = [1, 2, 3];
    function createIterator(array) {
        let count = 0;
        return {
            next: function () {
                return count < array.length?
                { value: array[count++], done: false }:
                { value: undefined, done: true };
            }
        }
    }

    let myIterator = createIterator(iterable);

    console.log(myIterator.next());

    function objectEntries(obj) {
        let index = 0;
        let propKeys = Object.keys(obj); //Reflect.ownKeys(obj);
    
        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (index < propKeys.length) {
                    let key = propKeys[index];
                    index++;
                    return { value: [key, obj[key]] };
                } else {
                    return { done: true };
                }
            }
        };
    }
    
    for (let [key,value] of objectEntries(obj)) {
        console.log(`${key}: ${value}`);
    }
</script>
# Generator
生成器对象是由一个 generator function 返回的,并且它符合可迭代协议和迭代器协议。
<script>
    function* generator() {
        yield 1;
        yield 2;
        yield 3;
    }
      
    const gen = generator(); // "Generator { }"
      
    console.log(gen.next().value); // 1
    console.log(generator().next().value); // 1
    console.log(generator().next().value); // 1
    
    function* makeRangeIterator(start = 0, end = Infinity, step = 1) {
        for (let i = start; i < end; i += step) {
            yield i;
        }
    }
    var a = makeRangeIterator(1,10,2)
    a.next() // {value: 1, done: false}
    a.next() // {value: undefined, done: true}
    
    //自定义的可迭代对象
    //我们可以像这样实现自己的可迭代对象：
    
    var myIterable = {
      *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
      }
    }
    
    for (let value of myIterable) {
        console.log(value);
    }
    // 1
    // 2
    // 3
    
    // 或者
    
    [...myIterable]; // [1, 2, 3]
    
    //使用迭代器遍历二维数组并转换成一维数组：
    function* iterArr(arr) {            //迭代器返回一个迭代器对象
        if (Array.isArray(arr)) {         // 内节点
            for(let i=0; i < arr.length; i++) {
                yield* iterArr(arr[i]);   // (*)递归
            }
        } else {                          // 离开
            yield arr;
        }
    }
    // 使用 for-of 遍历:
    var arr = ['a', ['b', 'c'], ['d', 'e']];
    for(var x of iterArr(arr)) {
        console.log(x);              // a  b  c  d  e
    }
    
    // 或者直接将迭代器展开:
    var arr = [ 'a', ['b',[ 'c', ['d', 'e']]]];
    var gen = iterArr(arr);
    arr = [...gen];                  // ["a", "b", "c", "d", "e"]
</script>

# Typescript 
<script>
    //Enumeration 枚举
    //Tuples 范型
    //Interfaces
    //optional
    //Decorator @Component

    interface Person {
        fname: string;
        lname: string;
        age?: number;
    }

    let employee1: Person {
        fname: "Tony",
        lname: "Li",
        age: 33
    }
</script>