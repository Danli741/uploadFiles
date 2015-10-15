var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');
var multer = require('multer');
var mime = require('mime-types');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
  }
});

var upload = multer({
  dest: "./Upload",
  storage: storage,
  rename: function (fieldname, filename) {
     return filename;
   },
   onFileUploadStart: function (file) {
     console.log(file.originalname + ' is starting ...');
   },
   onFileUploadComplete: function (file) {
     console.log(file.originalname + ' uploaded to  ' + file.path);
   }
 }
 );

mongoose.connect('localhost:27017/files');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('/', function(req, res) {
  console.log("in /");
  res.sendfile("index.html");
});

app.post('/upload', upload.single('file'), function(req, res, next) {
  console.log(req.file);
  res.status(204).end();
//  fs.writeFileSync('./file/test.txt', req.body.text);
})
app.listen(8080);
console.log("listening on 8080");
