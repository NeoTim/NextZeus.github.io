
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

### Shape

```

var bg:egret.Shape = new egret.Shape();

bg.graphics.beginFill(0x336699);
bg.graphics.dradRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
bg.graphics.endFill();

```

### 屏幕适配模式

* 修改data-scale-mode 或者 this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH
* showAll 不进行缩放
* fixedWidth 占满屏幕 保持宽高比缩放 
*

#### touchEnabled

```
var tx:egret.TextField = new egret.TextField();
tx.text = "";
tx.size = 32;

tx.x = 20;
tx.y = 20;
tx.width = this.stage.StageWidth - 40;

tx.touchEnable = true;
tx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);

this.addchild(tx);


private touchHandler(evt:egret.TouchEvent):void{
    var tx:egret.TextField = evt.currentTarget;
    tx.textColor = 0x00ff00;
}

```

### 资源加载
* json 格式作为RES资源加载配置文件的格式

default.res.json

```

{
    "resources": [
        {
            "name": "bgImage",
            "type": "image",
            "url": "assets/bg.jpg"
        },
        {
            "name": "egretIcon",
            "type": "image",
            "url": "assets/egret_icon.png"
        },
        {
            "name": "description",
            "type": "json",
            "url": "config/description.json"
        }
    ],
    "groups": [
        {
            "name": "preload",
            "keys": "bgImage,egretIcon"
        }
    ]
}


```

* name - 资源唯一标识符
* type - image PNG和JPG格式 载入后解析为egret.Texture对象,text文本文件载入后解析为string对象,json文本类型载入后解析为json对象
* groups - 资源分组加载 name,keys

### 程序加载资源
```

RES.loadGroup("preload");

var bm:egret.Bitmap = new egret.Bitmap(RES.getRes("bgImage));


异步加载

RES.getResAsync("description_json", this.startAnimation, this)

private startAnimation(result: string[]) {
    let parser = new egret.HtmlTextParser();

    let textflowArr = result.map(text => parser.parse(text));
    let textfield = this.textfield;
    let count = -1;
    let change = () => {
        count++;
        if (count >= textflowArr.length) {
            count = 0;
        }
        let textFlow = textflowArr[count];

        // 切换描述内容
        // Switch to described content
        textfield.textFlow = textFlow;
        let tw = egret.Tween.get(textfield);
        tw.to({ "alpha": 1 }, 200);
        tw.wait(2000);
        tw.to({ "alpha": 0 }, 200);
        tw.call(change, this);
    };

    change();
}

```

### TextField

```

let textfield = new egret.TextField();
this.addChild(textfield);
textfield.alpha = 0;
textfield.width = stageW - 172;
textfield.textAlign = egret.HorizontalAlign.CENTER;
textfield.size = 24;
textfield.textColor = 0xffffff;
textfield.x = 172;
textfield.y = 135;
this.textfield = textfield;

```

### 深度控制

```
//获取深度值
this.getChildIndex(bg);

//直接设置深度
this.setChildIndex(bg, 1);

//交换两个对象的深度
this.swapChildren(super,hulk);

最大深度 ＝ 显示列表的长度 － 1

```

### Tween动画效果
```
egret.Tween.get(girl)
            .to({scaleX:2,scaleY:2},index*100,egret.Ease.circIn)
            .to({scaleX:1,scaleY:1},index*100,egret.Ease.circIn)
```

### WebSocket

```
// init websocket
private webSocket: egret.WebSocket = new egret.WebSocket();

private connectWebSocket():void{
    this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
    this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);

    //egret test server 
    this.webSocket.connect("echo.websocket.org", 80);
}

private onSocketOpen():void{
    var cmd = "hello websocket";
    console.log("The connection is successful, send data: " + cmd); 
    this.webSocket.writeUTF(cmd);
}

private onReceiveMessage(e:egret.Event):void{
    var msg = this.webSocket.readUTF();
    console.log("receive data ", msg)
}

```