#RPC 方案配置

实际项目中，使用过zmq，也使用过pomelo-rpc，

## 方案1 zmq

```
//配置zmq
var zmq = require('pomelo-rpc-zeromq-renew');//0.0.9版本

app.set('proxyConfig', {
	rpcClient: zmq.client
});

app.set('remoteConfig', {
	rpcServer: zmq.server
});

```

##方案2 pomelo-rpc

```
var Client = require('pomelo-rpc').client;
var Server = require('pomelo-rpc').server;

app.set('proxyConfig', {
	rpcClient: Client
});

app.set('remoteConfig', {
	rpcServer: Server
});

```

##两种方案对比
...待续
