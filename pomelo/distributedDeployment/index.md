# 分布式部署

#### 说明

我正在做的是公司的一个项目，所以服务器上的配置都是找运维帮忙，服务器间配置ssh登录这一块还不是太了解。
配置服务器间ssh自动登录
假如有服务器A, B
要配置A 可以ssh登录服务器B
需要在服务器A的 ~/.ssh目录下创建authorized_keys文件，将服务器B的rsa算法产生的公钥写入文件即可。

例如：
ssh-rsa 服务器B的公钥 username@服务器名称

## 配置分布式系统应用环境

1. 所有服务器必须是相同类型的操作系统
2. 必须有相同的用户名
3. nodejs版本必须是一致的。 
4. game-server代码放置的路径也必须是一致的。 /home/pomelo/data/work/lordofpomelo
5. all machines 配置ssh login options; 在/home/pomelo/.ssh下创建config文件; 目的是使得各个机器之间可以顺畅的ssh登录
6. 让运维帮忙 配置主从服务器可ssh 互相登录[自己运维方面知识不足]


### 官方ssh config
```

# 官方说的config 我没尝试过
Host *
HashKnownHosts no
CheckHostIP no
StrictHostKeyChecking no

```

### sshrun
game-server/node_modules/pomelo/lib/master/starter.js sshrun function

## 实战经验

### 说明
master-server, gate-server ,connector-server 部署服务器A IP:xx.xx.xx.xx  公网IP:yy.yy.yy.yy
data-server, activity-server 部署在服务器B IP: zz.zz.zz.zz

### 配置如下

```
master.json

{
    "production":{
        "id":"master-server-1",
        "host":"xx.xx.xx.xx",
        "port":3005
    }
}

servers.json

{
    "production":{
        "gate":[
            {"id": "gate-server-1", "host": "xx.xx.xx.xx", "clientPort": 3010, "frontend": true}
        ],
        "connector":[
            {"id":"connector-server-1", "host":"xx.xx.xx.xx", "port":4001, "clientPort": 3006, "clientHost":"yy.yy.yy.yy", "frontend": true, "max-connections":1000},
            {"id":"connector-server-2", "host":"xx.xx.xx.xx", "port":4002, "clientPort": 3007, "clientHost":"yy.yy.yy.yy", "frontend": true, "max-connections":1000},
            {"id":"connector-server-3", "host":"xx.xx.xx.xx", "port":4003, "clientPort": 3008, "clientHost":"yy.yy.yy.yy", "frontend": true, "max-connections":1000}
        ],
        "data":[
            {"id":"data-server-1", "host":"zz.zz.zz.zz", "port":5000}
        ],
        "activity":[
            {"id":"activity-server-1", "host":"zz.zz.zz.zz", "port":6000},
            {"id":"activity-server-2", "host":"zz.zz.zz.zz", "port":6001}
        ]
    }
}


```

### 配置服务器A，B通过ssh登录
需要在服务器A的 ~/.ssh目录下创建authorized_keys文件，将服务器B的rsa算法产生的公钥写入文件即可。

### 启动
只启动服务器A的进程就可以了。我是用forever start app.js --env=production启动的。
主服务器启动后，检测到zz.zz.zz.zz 不是本地IP， 会走到master/starter.js sshrun方法 ssh 登录到服务器B 启动服务器B的进程。

