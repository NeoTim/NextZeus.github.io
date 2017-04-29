
### 项目结构

src - 项目代码
bin-debug - 编译和运行的debug目录，只读
libs - 存放库文件，包括Egret核心库和第三方库
resource - 放置资源文件 default.res.json 配置资源
template - 调试过程所需目录 只读
egretProperties.json - 项目的配置文件，一般会用到里面的modules字段来配置项目的模块
index.html - 项目访问的入口文件 配置旋转缩放模式背景颜色等
favicon.ico - 一个icon

### 启动首页设置
```

<div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
    data-entry-class="Main"
    data-orientation="auto"
    data-scale-mode="showAll"
    data-resolution-mode="retina"
    data-frame-rate="30"
    data-content-width="480"
    data-content-height="800"
    data-show-paint-rect="false"
    data-multi-fingered="2"
    data-show-fps="false" 
    data-show-log="false"
    data-log-filter="" 
    data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9"> 
</div>

```

* 设置如下
    * data-entry-class="Main" 入口文件
    * data-orientation="auto" 旋转模式
    * data-scale-mode="showAll" 缩放模式
    * data-frame-rate="30" 运行的帧率
    * data-content-width="480" 舞台的设计宽
    * data-content-height="800" 舞台的设计高
    * data-show-paint-rect="false" 
    * data-multi-fingered="2" 多指触摸
    * data-show-fps="false" data-show-log="false" 设置帧率和log 只在调试时显示 发布的版本会去掉
    * data-log-filter="^egret" 设置正则表达式过滤条件 只显示匹配的日志
    * data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9" 设置fps面板的样式
    * 

