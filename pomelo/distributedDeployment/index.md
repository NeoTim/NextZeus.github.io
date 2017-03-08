# 分布式部署

## 配置分布式系统应用环境

1. 所有服务器必须是相同类型的操作系统
2. 必须有相同的用户名
3. nodejs版本必须是一致的。 install absolute path也必须是一致的 /home/pomelo/node-v0.10.21-linux-x64
4. game-server代码放置的路径也必须是一致的。 /home/pomelo/data/work/lordofpomelo
5. all machines 配置ssh login options; 在/home/pomelo/.ssh下创建config文件; 目的是使得各个机器之间可以顺畅的ssh登录
```
#config
Host *
HashKnownHosts no
CheckHostIP no
StrictHostKeyChecking no
```
6. 更新配置的IP ，替换成真实机器的IP; mysql.json, master.json ,servers.json
7. 更新web-server下config.js 将GATE_HOST,GATE_PORT修改为game-server的gate服务进程的IP地址和端口
8. 如果game-server和web-server的gate进程在同一台服务器上，则可将GATE_HOST配置为window.location.hostname;

### sshrun

game-server/node_modules/pomelo/lib/master/starter.js sshrun function