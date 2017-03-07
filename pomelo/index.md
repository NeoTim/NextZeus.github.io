# Pomelo框架总结
## A fast,scalable,distributed game server framework for Node.js

### 适用场景
* 多人游戏：手游，社交游戏，网页游戏，MMORPG ,ARPG
* 实时应用：聊天，消息推送，等等

### 特点
* 高性能：基于Node.js开发，分布式多进程
* 扩展性强：灵活的服务器扩展，通过配置servers.json或者命令动态管理服务器群
* 轻量级：几乎零配置；基于nodejs开发效率高；javascript语言入门容易；API设计简单，容易上手，开发快速
* 多平台支持：js,flash,android,ios,cocos,c
* 库和工具辅助开发，pomelo-cli,pomelo-admin,pomelo-robot
* 案例丰富，参考资料众多[wiki管理不太好，混乱]
* 支持插件架构，如master高可用，在线状态
* 可自定义协议，组件
* 松耦合：所有的component,库，工具都可以用npm module的形式扩展进来
* 目前版本已更新到2.2.5 支持nodeV6+

### 安装
> npm install pomelo -g
> 
> pomelo init helloWorld
> 
> cd helloWorld & sh npm-install.sh
>
> cd game-server & pomelo start
> 
> cd web-server & node app.js
> 


### Pomelo启动流程

![启动模型](https://camo.githubusercontent.com/5e2819755651743710be78547da919109291801f/687474703a2f2f706f6d656c6f2e6e6574656173652e636f6d2f7265736f757263652f646f63756d656e74496d6167652f73746172745f6d6f64656c2e706e67)

1. createApp 创建app应用实例
2. 加载配置app.configure() & 默认component
3. master服务器启动，通过配置信息和启动参数启动其他服务器群

![组件加载](https://camo.githubusercontent.com/fd833b788c4d0f211aed0abd4dd631feed3dacde/687474703a2f2f706f6d656c6f2e6e6574656173652e636f6d2f7265736f757263652f646f63756d656e74496d6167652f636f6d706f6e656e74735f6c6f61642e706e67)

### App Configuration

```

var pomelo = require('pomelo);
var app = pomelo.createApp();
//<!--env:development|production serverType: master/gate/connector/....-->
app.configure(<env>,<serverType>, function(){
	//<!--configure filter-->
	app.before(pomelo.filters.toobusy());//接口访问限制
	app.filter(pomelo.filters.serial()); // configure builtin filter: serialFilter
    app.filter(pomelo.filters.time()); //开启conn日志，对应pomelo-admin模块下conn request
    app.rpcFilter(pomelo.rpcFilters.rpcLog());//开启rpc日志，对应pomelo-admin模块下rpc request
	
	//<!--启动系统监控-->
	app.enable('systemMonitor');
	
	//<!--注册admin module-->
	//<!--enable systemMonotor后 注册的admin module才可使用-->
	var onlineUser = require('./app/modules/onlineUser');
    if (typeof app.registerAdmin === 'function') {
        app.registerAdmin(onlineUser, {app: app});
    }
	
	//<!--加载配置-->
	app.loadConfig('mysql', app.getBase() + '/config/mysql.json');
	
	//<!--configure router 路由函数-->
	app.route('chat', routeUtil.chat);
	
	// proxy configures
    app.set('proxyConfig', {
        cacheMsg: true,
        interval: 30,
        lazyConnection: true
        enableRpcLog: true
    });

    // remote configures
    app.set('remoteConfig', {
        cacheMsg: true,
        interval: 30
    });
	
	//<!--设置内部connector组建 心跳时长 通信协议-->
	app.set('connectorConfig',{
            connector: pomelo.connectors.hybridconnector,
            heartbeat: 30,
            useDict: true,
            useProtobuf: true,
            handshake: function (msg, cb) {
                cb(null, {});
            }
    });
    
    //<!--设置变量-->
    app.set(key,value);
    
    //<!--加载用户自定义组件 组件导出的都是工厂函数，app可自动识别，讲其自身作为opt参数传递给组件,方便访问app上下文-->
    app.load(helloWorldComponent, opt)
    
    //<!--使用插件-->
    var statusPlugin = require('pomelo-status-plugin');
    app.use(statusPlugin, {
	    status:{
    		host:	'127.0.0.1',
    		port:	6379
	    }
	});	
	
	//<!--启动app -->
	app.start();
});

process.on('uncaughtException', function(err){
	console.error('uncaughtException : ', err, err.stack());
});

```

### servers.json 

1. max-connections(optional) 前端server可以hold的最大连接数
2. cpu 设置服务器的cpu相关性的过程,只适用于unix platform
