# concurrence 高并发

今天写了一个接口，测试了一下高并发情况下，某个接口是如何执行的
代码如下：

```
// 测试大量并发请求 nodejs 事件队列
function testRedisLock(req,res) {
    //测试redis原子性的分布式锁
    console.log('time-start: ', req.body.time, ' index: ',req.body.index);
    var jackPotDiamond = 0;
    var autoFillTimes = 0;
    var fillDiamond = 10;
    var index = req.body.index;

    var log = {
        index:  req.body.index,
        time:   req.body.time,
        step    :   0
    };

    async.waterfall([
        function (cb) {
            redisUtil.getRedisData("POT_KEY", function (err,data) {
                console.log('index: ', index, ' get jackPotDiamond: ',data);
                if(!err && !!data){
                    jackPotDiamond = parseInt(data);
                }
                cb(err);
            });
        },
        function (cb) {
            log.oldJackPotDiamond = jackPotDiamond;
            jackPotDiamond += 10;
            log.jackPotDiamond = jackPotDiamond;
            redisUtil.setRedisData("POT_KEY", fillDiamond, function (err) {
                console.log('index: ', index, ' set jackPotDiamond over: ',jackPotDiamond);
                if(!!err){
                    log.step = 1;
                }
                cb(err);
            });
        },
        function (cb) {
            redisUtil.getRedisData("AUTO_FILL_TIMES", function (err,data) {
                console.log('index: ', index, ' get autoFillTimes: ',data);
                if(!err && !!data){
                    autoFillTimes = parseInt(data);
                }
                cb(err);
            });
        },
        function (cb) {
            log.oldAutoFillTimes = autoFillTimes;
            autoFillTimes += 1;
            log.autoFillTimes = autoFillTimes;
            redisUtil.setRedisData("AUTO_FILL_TIMES", autoFillTimes, function (err) {
                console.log('index: ', index, ' set autoFillTimes over: ', autoFillTimes);
                if(!!err){
                    log.step = 2;
                }
                cb(err);
            });
        },
        function (cb) {
            redisUtil.INCRBY("AUTO_FILL_DIAMOND", fillDiamond, function (err) {
                console.log('index: ', index, ' incrby AUTO_FILL_DIAMOND over: ');
                if(!!err){
                    log.step = 3;
                }
                cb(err);
            });
        }
    ],function (err) {
        if(!!err){
            log.error = err;
        }
        // console.log('autoFillJackPot： ', req.body.time,log);
        return res.status(200).send({info : log});
    });

}

```

下面是测试文件

```
var request = require("request");
var url = "http://localhost:5316/testRedisLock";

for(let i = 0 ; i < 1000; i++){
  requestServer(i);
}

function requestServer(index){
  request.post({
    url:  url,
    form: {
      index:  index,
      time: Date.now()
    }
  }, function(err,resp,data){
    // console.log('服务器返回结果: ', JSON.parse(data).info);
  });
}

```

结果输出片段如下:

```

 index:  204  incrby AUTO_FILL_DIAMOND over:
 index:  205  incrby AUTO_FILL_DIAMOND over:
 POST /testRedisLock 873.425 ms
 POST /testRedisLock 873.916 ms
 POST /testRedisLock 872.349 ms

 index:  487  get autoFillTimes:  1
 index:  486  get autoFillTimes:  1
 index:  485  get autoFillTimes:  1
 index:  358  set autoFillTimes over:  2
 index:  359  set autoFillTimes over:  2
 index:  360  set autoFillTimes over:  2
 index:  361  set autoFillTimes over:  2
 index:  362  set autoFillTimes over:  2
 index:  363  set autoFillTimes over:  2

 index:  439  set autoFillTimes over:  2
 index:  440  set autoFillTimes over:  2
 index:  443  set autoFillTimes over:  2
 index:  444  set autoFillTimes over:  2
 index:  206  incrby AUTO_FILL_DIAMOND over:
 index:  207  incrby AUTO_FILL_DIAMOND over:
 index:  208  incrby AUTO_FILL_DIAMOND over:
 index:  209  incrby AUTO_FILL_DIAMOND over:
 index:  210  incrby AUTO_FILL_DIAMOND over:


 index:  354  incrby AUTO_FILL_DIAMOND over:
 index:  355  incrby AUTO_FILL_DIAMOND over:
 index:  356  incrby AUTO_FILL_DIAMOND over:
 index:  357  incrby AUTO_FILL_DIAMOND over:
 POST /testRedisLock 720.575 ms
 POST /testRedisLock 718.327 ms
 POST /testRedisLock 717.320 ms
 POST /testRedisLock 716.725 ms
 POST /testRedisLock 715.847 ms


 index:  488  set autoFillTimes over:  2
 index:  487  set autoFillTimes over:  2
 index:  486  set autoFillTimes over:  2
 index:  485  set autoFillTimes over:  2
 index:  358  incrby AUTO_FILL_DIAMOND over:
 index:  359  incrby AUTO_FILL_DIAMOND over:
 index:  360  incrby AUTO_FILL_DIAMOND over:
 index:  361  incrby AUTO_FILL_DIAMOND over:


 index:  436  incrby AUTO_FILL_DIAMOND over:
 index:  435  incrby AUTO_FILL_DIAMOND over:
 index:  433  incrby AUTO_FILL_DIAMOND over:
 index:  462  incrby AUTO_FILL_DIAMOND over:
 index:  461  incrby AUTO_FILL_DIAMOND over:
 index:  460  incrby AUTO_FILL_DIAMOND over:
 index:  459  incrby AUTO_FILL_DIAMOND over:
 index:  458  incrby AUTO_FILL_DIAMOND over:
 index:  457  incrby AUTO_FILL_DIAMOND over:
 index:  456  incrby AUTO_FILL_DIAMOND over:
 index:  455  incrby AUTO_FILL_DIAMOND over:
 index:  454  incrby AUTO_FILL_DIAMOND over:
 index:  453  incrby AUTO_FILL_DIAMOND over:
 index:  452  incrby AUTO_FILL_DIAMOND over:
 index:  451  incrby AUTO_FILL_DIAMOND over:
 index:  450  incrby AUTO_FILL_DIAMOND over:
 index:  449  incrby AUTO_FILL_DIAMOND over:
 index:  448  incrby AUTO_FILL_DIAMOND over:
 index:  447  incrby AUTO_FILL_DIAMOND over:
 index:  446  incrby AUTO_FILL_DIAMOND over:
 index:  445  incrby AUTO_FILL_DIAMOND over:
 index:  442  incrby AUTO_FILL_DIAMOND over:
 index:  441  incrby AUTO_FILL_DIAMOND over:
 index:  484  incrby AUTO_FILL_DIAMOND over:
 index:  483  incrby AUTO_FILL_DIAMOND over:
 index:  482  incrby AUTO_FILL_DIAMOND over:
 index:  481  incrby AUTO_FILL_DIAMOND over:
 index:  480  incrby AUTO_FILL_DIAMOND over:


 index:  489  incrby AUTO_FILL_DIAMOND over:
 index:  488  incrby AUTO_FILL_DIAMOND over:
 index:  487  incrby AUTO_FILL_DIAMOND over:
 index:  486  incrby AUTO_FILL_DIAMOND over:
 index:  485  incrby AUTO_FILL_DIAMOND over:
 POST /testRedisLock 563.268 ms
 POST /testRedisLock 563.034 ms
 POST /testRedisLock 562.748 ms
 POST /testRedisLock 562.800 ms
 POST /testRedisLock 562.576 ms

```

通过上面的log输出，可以看出来，
1. 虽然node.js是单线程，但程序的执行，并不会逐条逐行完毕，再执行下一个请求
2. 各个请求之间是独立的，这也是http请求独立的一个特点
3. 单个请求中每个回调函数的注册，是有序的；但是所有请求，所有的回调函数是混乱的，遵循先来者先注册的原则
4. 在这个接口中，redis资源被并发的请求所共享。 虽然每个redis操作是具有原子性的，但是如果是事务类型的操作，则不能保证数据的正确性。



### 解决资源冲突方案
1. 请求加入队列
2. redis事务操作 [，如果不只是直接更新，而是需要getRedisData, 也不行]