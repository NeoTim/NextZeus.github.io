/**
 * Created by lixiaodong on 16/6/20.
 */
function *gen(x){
    var y = yield x + 1;
    return y;
}

//var g = gen(2);
//console.log(g.next());
//console.log(g.next());

//异步任务的封装
var fetch = require('node-fetch');

function *fetchData(){
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    //console.log('result->',result);
    return result;
}

var FETCHDATA = fetchData();

var result = FETCHDATA.next();

result.value
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        FETCHDATA.next(data);
    });

var fs = require('fs');
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName){
    return function (callback){
        return fs.readFile(fileName,callback);
    }
}

var readFileThunk = Thunk(fileName);

readFileThunk(callback);

// ES5版本
var ES5Thunk = function(fn){
    return function (){
        var args = Array.prototype.slice.call(arguments);
        return function (callback){
            args.push(callback);
            return fn.apply(this, args);
        }
    };
};

// ES6版本
var ES6Thunk = function(fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
    };
};

//Thunkify模块

var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
    // ...
});

function thunkifyCode(fn){
    return function(){
        var args = new Array(arguments.length);
        var ctx = this;

        for(var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        return function(done){
            var called;

            args.push(function(){
                if (called) return;//回调函数只执行一次
                called = true;
                done.apply(null, arguments);
            });

            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
}

//Thunk函数的自动流程管理
//Thunk函数真正的威力，在于可以自动执行Generator函数。下面就是一个基于Thunk函数的Generator执行器。

function run(fn) {
    var gen = fn();

    function next(err, data) {//递归调用next
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }

    next();
}

run(gen);
//前提是每一个异步操作，都要是Thunk函数，也就是说，跟在yield命令后面的必须是Thunk函数。

//co模块
//用于Generator函数的自动执行。

//比如，有一个Generator函数，用于依次读取两个文件。

var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
};

var gen = function* (){
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
//co模块可以让你不用编写Generator函数的执行器。

var co = require('co');
co(gen);
//上面代码中，Generator函数只要传入co函数，就会自动执行。

//co函数返回一个Promise对象，因此可以用then方法添加回调函数。

co(gen).then(function (){
    console.log('Generator 函数执行完成');
});
//上面代码中，等到Generator函数执行结束，就会输出一行提示。