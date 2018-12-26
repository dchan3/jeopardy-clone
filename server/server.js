var express = require('express'), app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  config = require('../config/db'), path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.url).then(() => {
  console.log('connection succesful');
}).catch((err) => { console.error(err); });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('./routes')(app);
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  res.sendFile(path.resolve(__dirname, '../client/dist/style.css'));
  res.end();
});

app.listen(port);
console.log('Running on port ' + port);
module.exports = app;
