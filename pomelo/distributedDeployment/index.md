# 分布式部署

## 配置分布式系统应用环境

1. 所有服务器必须是相同类型的操作系统
2. 必须有相同的用户名
3. nodejs版本必须是一致的。 install absolute path也必须是一致的 /home/pomelo/node-v0.10.21-linux-x64
4. game-server代码放置的路径也必须是一致的。 /home/pomelo/data/work/lordofpomelo
5. all machines 配置ssh login options; in ~/.ssh目录下创建 /home/pomelo/.ssh文件夹,在/home/pomelo/.ssh下创建config文件; 使得服务器之间可以很平滑的登陆
```
#config
Host *
HashKnownHosts no
CheckHostIP no
StrictHostKeyChecking no
```
6. 更新配置的IP ，替换成真实机器的IP; mysql.json, master.json ,servers.json

### sshrun

game-server/node_modules/pomelo/lib/master/starter.js sshrun function