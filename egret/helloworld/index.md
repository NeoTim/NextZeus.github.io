
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

### 文件依赖 
```
//a.ts
class testA{
    public static arr:Array<any> = ['a','b','c'];
}

//b.ts
////<reference path="testA.ts" />
class testB{
    public static str:String = testA.arr.join("");
}

//c.ts
class testC{
    //error
    public static test:any = egret.getDefinitionByName(testB.str);
}



```

那么当我们添加了 TestB.testBstr 的调用之后浏览器发现 TestA 类并没有被定义，进而导致 testBStr 这个属性页找不到了。当我们编译之后发生了什么呢，检查一下生成的 index.html 文件会发现 TestB.js 是在 TestCall.js 之前加载的，而 TestA.js 是在最后加载的。当 TestB.js 调用 TestA.js 中的文件的内容时浏览器将会报错

解决方法

```

这种情况解决方法也很简单，就是告诉编译器我们的类的依赖关系。在 TypeScript 中，使用<reference>标签来表示引用关系。在 reference 标签中可以标记依赖文件的相对路径。所以只需要在 TestB 类之前加入如下注释即可：

///<reference path="TestA.ts" />
class TestB{
    public static testBStr:string = TestA.arr.join("");
}
上面这种情况一般发生在静态成员的引用上，还有其他情况在极小概率下可能导致该现象，如果遇到可以加入依赖关系标签来告诉编译器正确的加载方式

```

### 核心显示类

* DisplayObject ［显示对象基类 所有显示对象均继承自此类]
    * DisplayObjectContainer ［显示对象容器接口，所有显示对象容器均实现此接口]
        * Sprite  [带有矢量绘制功能的显示容器]
        * Stage  [舞台类]
    * Bitmap [位图 显示图片]
    * Shape  [矢量图 绘制矢量图形]
    * TextField  [文本类]
    * BitmapText [位图文本类]

舞台坐标原点在左上角(0,0) 横轴X 纵轴Y

### 属性
scaleX, scaleY 缩放
alpha 透明度
rotation 旋转
width,height
skewX,skewY 斜切
visible 
x,y
anchorOffsetX,anchorOffsetY 绝对锚点


使用 DisplayObject 类的 localToGlobal() 方法将本地坐标转换为舞台坐标。

两个方块的深度互换。
sprcon.swapChildren( spr1, spr2 );
第二种方法进行两个方块深度互换。
sprcon.swapChildrenAt( 0, 1 );

第三种 重新设置自对象深度
setChildIndex(spr1,1)
setChildIndex(spr2,0)

<!--获取自对象-->
spron.getChildAt(1);
比
spron.getChildByName("sprite2");
快速很多

### 遮罩

<!--矩形-->
mask属性
shp.mask = new egret.Rectangle(20,20,30,50);

<!--对象遮罩-->
mySprite.mask = maskSprite;

<!--碰撞检测 三个参数 精确碰撞-->
var isHit:boolean = shp.hitTestPoint(10,10,true);

### TextField

```
var lebel:egret.TextField = new egret.TextField();
label.width = 80;
label.height = 80;
label.textColor = 0xff0000;
label.size = 16;
label.fontFamily = "KaiTi";
label.text = "";
<!--布局-->
label.textAlign = egret.HorizontalAlign.RIGHT;
label.textAlign = egret.HorizontalAlign.CENTER;

label.verticalAlign = egret.VerticalAlign.BOTTOM;
label.verticalAlign = egret.VerticalAlign.MIDDLE;

//设置描边属性
label.strokeColor = 0x0000ff;
label.stroke = 2;
//设置粗体与斜体
label.bold = true;
label.italic = true;


var tx:egret.TextField = new egret.TextField;
// 注意_container是事先建立好的一个显示容器，即 egret.DisplayObjectContainer，并且已经添加到显示列表中
tx.width = this._container.stage.stageWidth - 20;
tx.textFlow = (new egret.HtmlTextParser).parser(
    '没有任何格式初始文本，' +
    '<font color="#0000ff" size="30" fontFamily="Verdana">Verdana blue large</font>' +
    '<font color="#ff7f50" size="10">珊瑚色<b>局部加粗</b>小字体</font>' +
    '<i>斜体</i>'
);
tx.x = 10;
tx.y = 90;
this._container.addChild( tx );

var tx:egret.TextField = new egret.TextField;
tx.width = 400;
tx.x = 10;
tx.y = 10;
tx.textColor = 0;
tx.size = 20;
tx.fontFamily = "微软雅黑";
tx.textAlign = egret.HorizontalAlign.CENTER;
tx.textFlow = <Array<egret.ITextElement>>[
    {text: "妈妈再也不用担心我在", style: {"size": 12}}
    , {text: "Egret", style: {"textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}}
    , {text: "里说一句话不能包含各种", style: {"fontFamily": "楷体"}}
    , {text: "五", style: {"textColor": 0xff0000}}
    , {text: "彩", style: {"textColor": 0x00ff00}}
    , {text: "缤", style: {"textColor": 0xf000f0}}
    , {text: "纷", style: {"textColor": 0x00ffff}}
    , {text: "、\n"}
    , {text: "大", style: {"size": 36}}
    , {text: "小", style: {"size": 6}}
    , {text: "不", style: {"size": 16}}
    , {text: "一", style: {"size": 24}}
    , {text: "、"}
    , {text: "格", style: {"italic": true, "textColor": 0x00ff00}}
    , {text: "式", style: {"size": 16, "textColor": 0xf000f0}}
    , {text: "各", style: {"italic": true, "textColor": 0xf06f00}}
    , {text: "样", style: {"fontFamily": "楷体"}}
    , {text: ""}
    , {text: "的文字了！"}
];
this.addChild( tx );


```

