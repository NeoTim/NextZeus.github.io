/**
 * Created by lixd on 16/6/14.
 */
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
