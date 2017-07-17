# 重新认识Model

- data + handlerFunction
- Models represent knowledge. A model could be a single object (rather uninteresting), or it could be some structure of objects.
- In a scene , model equals to objects (model = objects)
- Model is data set ，but not handler , controller,or service
- 封装起来的函数，根据处理的对象不同，分为不同的service. 
- 不用特意为了封装某个逻辑，特定的创建一个service.比如login,同样是处理user的，放在userService中就可以了。
- 


# Pomelo服务器框架设计
	- app
		- servers
			- gate
				- handler	(router)
			- connector
				- handler	(router)
			- data
				- handler (router)
				- remote
		- config
		- models	[Model]
			- entity [object data structure]
		- services(Controller)
			- logic handler
		- components
			- mongodb
			- redis
			- logger
		- util


* components 放在app.configure 中启动
* servers中每个服务器，用于区分不同的业务服务，而不是说数据也一定要区分服务器
* 