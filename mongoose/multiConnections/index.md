# Handling multiple databases and connections with Mongoose


```

var mongoose = require("mongoose");

var conn1 = mongoose.createConnection("mongodb://localhost/db1",{"config": { "autoIndex": false }});
var conn2 = mongoose.createConnection("mongodb://localhost/db2",{"config": { "autoIndex": false }});

mongoose.main_conn = conn1;
mongoose.stats_conn = conn2;

module.exports = mongoose;



```