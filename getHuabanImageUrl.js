```javascript
//var _ = require('underscore');
var request = require('request');
var htmlparser = require("htmlparser2");
var imagesUrls = [];
var imageUrl = 'http://hbimg.b0.upaiyun.com/';

function addPostfix(key){
    return imageUrl+ key + '_fw320';
}

var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        if(name === "script" && attribs.type === "text/javascript"){
            //console.log("JS! Hooray!");
        }
    },
    ontext: function(text){
        if(text.indexOf('app.page["board"]') != -1){
            var properties = text.split('\n');
            var app = {page : {}}
            properties.forEach(function(property) {

                if(property.indexOf('board_id') != -1){
                    var proContent = eval(property);
                    var pins = proContent.pins;

                    pins.forEach(function (pin) {
                       if(pin.file && pin.file.key){
                            imagesUrls.push(addPostfix(pin.file.key))
                       }
                    });
                    console.log(imagesUrls)
                }
            //    var tup = property.split(':');
                //console.log('tup-->>',tup[0].trim(),tup[0].trim() == "key");
                //obj[tup[0]] = tup[1];
            });
            //content = eval(text);
            //console.log('image urls-->>',imagesUrls);
        }
    },
    onclosetag: function(tagname){
        if(tagname === "script"){
            //console.log("That's it?!");
        }
    }
}, {decodeEntities: true});

var url = 'http://huaban.com/boards/19232159/?max=674172266&limit=20&wfl=1';
var content ;
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        content = body;
        //console.log(content) // Show the HTML for the Google homepage.
        parser.write(content);
        parser.end();
    }
});



```
