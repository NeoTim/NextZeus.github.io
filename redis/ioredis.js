/**
 * Created by lixd on 2017/4/5.
 */
var Redis = require('ioredis');
var redis = new Redis();


var pipeline = redis.pipeline();

pipeline.set("foo", 'bar');
pipeline.del("foo");

pipeline.exec(function (err,results) {
    console.log(err, results);
});


var promise = redis.pipeline().set('foo', 'bar').exec();
promise.then(function (result) {
    // result === [[null, 'OK'], [null, 'bar']]
    console.log('result-->>',result);
});