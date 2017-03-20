#session closed

```
session on [connector-server-1] is closed with session id: 1

```

## protobuf设置不对导致的

```
/pomelo/lib/connectors/common/coder.js
var encodeBody = function(server, route, msgBody) {
    // encode use protobuf 设置protobuf之后 就会走这里
    //console.log('encode use protobuf==>>',!!server.protobuf,!!server.protobuf.getProtos().server[route],msgBody);
    if(!!server.protobuf && !!server.protobuf.getProtos().server[route]) {
        //console.log('=====>>>11111');
        msgBody = server.protobuf.encode(route, msgBody);
    } else if(!!server.decodeIO_protobuf && !!server.decodeIO_protobuf.check(Constants.RESERVED.SERVER, route)) {
        //console.log('=====>>>22222');
        msgBody = server.decodeIO_protobuf.encode(route, msgBody);
    } else { //一般是走这里
        //console.log('=====>>>33333');
        msgBody = new Buffer(JSON.stringify(msgBody), 'utf8');
    }
    return msgBody;
};
```