/**
 * Created by lixd on 16/6/14.
 */
 ```javascript
class Calc{
    constructor(){
        console.log(' calc constructor !');
    }

    add(a,b){
        return a + b;
    }
}

var c = new Calc();

//var d = c.add(4,5);

//console.log(d);
{
  let a = 10;
  var b = 1;
}

for(let i = 0 ; i < 10 ; i++){
}

//let 不存在变量提升 var 变量可以提升
console.log(foo)
let foo = 2;

//暂时性死区 只要块级作用域内存在let命令，它所声明的变量就绑定这个区域，不再受外部的影响
var temp = 123;

if(true){
  temp = '';//ReferenceError
  let temp;
}
//暂时性死区意味着typeof不再是一个百分百安全的操作
typeof x;//ReferenceError
let x;

//let  相同作用域内 不允许重复声明
function (){
  let a;
  let a;
}

//不能在函数内部重新声明参数
function func( arg ){
  let arg;
}

```

'use strice'
const foo = 1;// strice模式下 声明时必须赋值

//常规模式下 
const foo;
foo = 1;

const 声明的常量也不提升 声明之后 strice 模式下不能修改 常规模式下修改无效但不报错


var message = '';
let age = 15;

//以下两行都会报错
const message = '';
const age = 20;

//复合类型变量 变量名不指向数据，指向数据所在地址
//const 命令只是保证变量名指向的地址不变，不保证该地址的数据不变
const foo = {};
foo.prop =12;

const foo = Object.freeze(); //对象冻结

foo.prop = 129;
//常规模式 不起作用
//strice模式报错 
```javascript
function* fibs(){
    var a = 0;
    var b = 1;
    while( true){
        yield a;
        [a,b] = [b,a+b];
    }
}
var [first , second, third, fourth, fifth,sixth] = fibs();
```
//fibs 是一个Generator函数 

let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError 因为x用到默认值y时，y还没有声明。

var s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

'xxx'.padStart(2, 'ab') // 'xxx'
'xxx'.padEnd(2, 'ab') // 'xxx'

'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '




//Set 类似数组 没有重复的值
Set实例的属性和方法
Set结构的实例有以下属性。

Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。
Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

add(value)：添加某个值，返回Set结构本身。
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
has(value)：返回一个布尔值，表示该值是否为Set的成员。
clear()：清除所有成员，没有返回值。

.add.add.add.clear.add.delete.has

// Map 像redis hash
// set add has get delete clear
// .set.set..
// map.size NaN 可以做key




```javascript
function* helloGenerator(){
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloGenerator();
```
/*
调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调
用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示
当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是>否遍历结束
*/
```javascript
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

yield语句
由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志。

遍历器对象的next方法的运行逻辑如下。

（1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。

（3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

需要注意的是，yield语句后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为JavaScript提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

```javascript
function* gen() {
  yield  123 + 456;
}
```
上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。

yield语句与return语句既有相似之处，也有区别。
相似之处在于，都能返回紧跟在语句后面的那个表达式的值。
区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。
一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield语句。
正常函数只能返回一个值，因为只能执行一次return；Generator函数可以返回一系列的值，因为可以有任意多个yield。
从另一个角度看，也可以说Generator生成了一系列的值，这也就是它的名称的来历（在英语中，generator这个词是“生成器”的意思）。






