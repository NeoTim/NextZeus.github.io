# Pomelo High Availability [高可用]

## 高可用性
[High_availability](https://en.wikipedia.org/wiki/High_availability)
High availability is a characteristic of a system, which aims to ensure an agreed level of operational performance, usually uptime, for a higher than normal period.

高可用性HA（High Availability）指的是通过尽量缩短因日常维护操作（计划）和突发的系统崩溃（非计划）所导致的停机时间，以提高系统和应用的可用性

## pomelo master 高可用

```
下载zookeeper
解压到/Users/xxx目录下
配置conf/zoo.cfg, [可直接改名zoo_sample.cfg为zoo.cfg 临时]

bin/zkServer.sh start ［启动zk服务］

切换到lordofpomelo 
执行 node scripts/createZKMasterhaNode.js 创建/pomelo/master Node[节点]

➜  game-server git:(master) ✗ node scripts/createZKMasterhaNode.js 
Connected to the server.
Node: /pomelo is created successfully.
Node: /pomelo/master is created successfully.


➜  game-server git:(master) ✗  pomelo start [ 启动game-server ]

➜  game-server git:(master) ✗  pomelo masterha [启动备用master ]



```

over