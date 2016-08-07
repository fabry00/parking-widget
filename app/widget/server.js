var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.static('assets'));

app.get('/widget.html', function (req, res) {
   res.sendFile( __dirname + "/" + "widget.html" );
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})