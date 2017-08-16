# JSON WEB Token

## What`s a JWT
* Based on a Web Standard(RFC7519)
* Used to Securely communicate JSON objects
* Consists of a header , payload , and signature->self-contained

### The JWT Header

The header is a JSON object usually consisting of the type (typ),
which is JWT, and the algorithim used for encrypting for the JWT(alg)

```
{
	"typ":	"JWT",
	"alg":	"HS256"
}

```

### The JWT Payload
The payload is a JSON object that consists of user-defined attributes (called public claims). Some attributes are defined in the standard (these are called reserved claims)

```
{
	"iss":	"http://myapi.com",	//reserved claim
	"user":	"nodebotanist"	//public claim
}

```

### The JWT Signature

The signature is the encoded header and payload, signed with a secret.

```
HMACSHA256(
	base64UrlEncode(header) + "." +
	base64UrlEncode(payload),
	secret)
```

This accomplishes several tasks at once, including:

*   Proves the identity of the sender
*   Ensures the message has not changed

### The JWT Token
A finished token looks like 
**[encoded header].[encoded payload].[signature]**



### express-jwt & jsonwebtoken

```

var secret = 'nyancat 4 ever';

app.use(expressJwt({
  secret: secret,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {//自定义getToken 默认有这个函数 
    var token = null;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {//支持 get
        token = req.query.token.split(' ')[1];
    }
    console.log("Token %s",token);
    return token;
  }
}).unless({path:['/login']}));


//login

router.post('/login',function(req,res,next){
  // cert must same as expressJwt secret
  var secret = 'nyancat 4 ever';
  var token = jwt.sign({username: req.body.username, password: req.body.password},secret,{expiresIn:  60 * 60});//expire 1 hour
  return res.status(200).json(token);
});


//test request

var request = require("request");

request.post({
    url:    'http://localhost:1337/login',
    form:{
        username:   'xiaodong',
        password:   'pass123'
    }
},function(err,resp,body){
    var token = 'Bearer ' + JSON.parse(body);
    request.post({
        url:    'http://localhost:1337/token',
        headers:{
            authorization:  token
        }
    },function(err1,resp1,body1){
    	
    });
});


```

# 注意 客户端的token 都要以 'Bearer ' 开头







