# Zeromq

## Centos6.5 Install ZeroMQ

```

1. cd /etc/yum.repos.d/
2. wget http://download.opensuse.org/repositories/home:/fengshuo:/zeromq/CentOS_CentOS-6/home:fengshuo:zeromq.repo
3. cd ~/
4. sudo yum install  libtool pkgconfig build-essential autoconf automake
5. sudo yum install zeromq-devel


```

### install zeromq error

```

g++版本低[4.7], 指定新版本g++

In my case, g++4.9 is installed in /opt/rh/devtoolset-3/root/usr/bin/g++ and
执行下面命令 指定g++编译路径
CC=/opt/rh/devtoolset-3/root/usr/bin/gcc CXX=/opt/rh/devtoolset-3/root/usr/bin/g++ npm install zmq

如果没有新的版本g++，则需要升级一下。


参考资料

http://zeromq.org/distro:centos
https://github.com/nodejs/node-gyp/issues/940

```

## Pomelo中配置RPC client & server 

```

var zmq = require('pomelo-rpc-zeromq-renew');

//具体都有哪些可配置的字段 看过源码也不清楚 参考lordofpomelo

app.set('proxyConfig', {
    rpcClient: zmq.client,
    cacheMsg: true,
    interval: 30,
    lazyConnection: true,
    enableRpcLog: true
});

app.set('remoteConfig', {
    rpcServer: zmq.server,
    cacheMsg: true,
    interval: 30
});

```