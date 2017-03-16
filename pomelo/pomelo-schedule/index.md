# pomelo-schedule

```
/**
 * Created by lixiaodong on 17/3/16.
 */
var schedule = require("pomelo-schedule");

function getTime() {
    return new Date().toISOString().
    replace(/T/, ' ').
    replace(/\..+/, '')
}

var xiazhu = function(data){
    console.log("run Job :" + data.name,' time: ', getTime());
    schedule.scheduleJob({start:Date.now()+15000}, gamestart, {name: '开始游戏'});
}

function gamestart(data) {
    console.log("run Job :" + data.name,' time: ', getTime());
    schedule.scheduleJob({start:Date.now()+15000}, gameend, {name: '发奖'});
}

function gameend(data) {
    console.log("run Job :" + data.name,' time: ', getTime());
}

schedule.scheduleJob({start:Date.now(), period:45000}, xiazhu, {name: '下注'});


//result
run Job :下注  time:  2017-03-16 09:57:45
run Job :开始游戏  time:  2017-03-16 09:58:00
run Job :发奖  time:  2017-03-16 09:58:15
run Job :下注  time:  2017-03-16 09:58:30
run Job :开始游戏  time:  2017-03-16 09:58:45
run Job :发奖  time:  2017-03-16 09:59:00

```

