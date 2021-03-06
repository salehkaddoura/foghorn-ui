var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.static('dist'));

app.all('/*', function(req, res) {
   res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);
console.log('The magic happens on port ' + port);