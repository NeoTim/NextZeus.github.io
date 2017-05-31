# 长数据加密解密

```
var crypto = require('crypto');
var encoding = require('encoding');
var constants = require('constants');

var publicKey  = "-----BEGIN PUBLIC KEY-----\n\
88NWVxB4KOSb9rbb5YRMryYavzAAhqLc5BhA4pzPw98VEi1/qcWYARa9dU6rc6/E\n\
u5Zu2DoNNwmYdRDA2wIDAQAB\n\
-----END PUBLIC KEY-----";

var privateKey = "-----BEGIN PRIVATE KEY-----\n\
Y77n9dnnLMft7wDVGR6fxWVckDOcS3X4l3FklXzXYb8aBYNzgthY//9a3SfWtd4M\n\
Yu6SfYQJ20k6LBmQS8L6sQp5+5VJgQJAHZDwIj7ZLZ5ggJZk41R3C5L2mUJYm0Kg\n\
uPMVMcEYyhLeoLsNvgGwsvg8rT/M8ppfOC16g4+sM8dHhG766eaEQQJASpzhGNIW\n\
Z5kl+mb7w0NJCY8C0pHFGaiTXlUqG/MSeviwBp4Pctt4fuLdnGsJiqlykRRPuPC2\n\
cGEA2neH9XcB8Q==\n\
-----END PRIVATE KEY-----";

var privateKeyObj = {
    key :   privateKey,
    padding:constants.RSA_PKCS1_PADDING
}

var publicKeyObj = {
    key :   publicKey,
    padding:constants.RSA_PKCS1_PADDING
}

function byte_split(buffer, number) {
    var bufferArray = [];

    for (var i = 0; i < buffer.length; i += number) {
        var temp = buffer.slice(i, i + number);
        bufferArray.push(temp);
    }
    return bufferArray;
}

/**
 * 私钥加密
 * @param {*} plaintext 
 */
function encryptLargeStringWithPrivateKey(plaintext){
    // java -- byte[] bytes = plaintext.getBytes("UTF-8");
    var buffer = Buffer.from(JSON.stringify(plaintext),"utf8");//default encoding utf8
    var bytes = byte_split(buffer,100);//分段
    var encrypted = "";
    var encryptedBufferList = [];

    bytes.forEach(function (item) {
        var encryptedBuffer = crypto.privateEncrypt(privateKeyObj,item);
        encryptedBufferList.push(encryptedBuffer);
    });

    encrypted = Buffer.concat(encryptedBufferList).toString('base64');
    return encrypted;
}

/**
 * 公钥解密
 * @param {*} plaintext 
 */
function decryptLargeStringWithPublicKey(plaintext){
    // java-- byte[] encryBytes = Base64.decodeBase64(encrypted.getBytes());
    var buffer = Buffer.from(plaintext,'base64');
    var bufferArray = byte_split(buffer, 128);
    var decrypted = "";

    for(var i = 0 ; i < bufferArray.length; i++){
        var decryptedStr = crypto.publicDecrypt(publicKeyObj,bufferArray[i]).toString('utf8');
        decrypted += decryptedStr;
    }

    decrypted = JSON.parse(decrypted);
    console.log('decrypted-->>',decrypted);
    return decrypted;
}

var form = {
    "sid":5010499,
    "rid":5010511,
    "orderId":"5010499-6a0c36e0-41de-11e7-bdad-d32e02f65f8c-owngame10000",
    "giftAmounts":[{"giftId": 17023,"amount": 10},{"giftId": 17022,"amount": 10}],
    "roomId":570,
    "extend":""
}

var encrypted = encryptLargeStringWithPrivateKey(form);
var decrypted = decryptLargeStringWithPublicKey(encrypted);



```