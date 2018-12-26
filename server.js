const nodemon = require('nodemon');
const path = require('path');

nodemon({
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'server/server'),
  ignore: [],
  watch: ['server/*'],
  ext: 'js'
}).on('restart', function() {
  console.log('App restarted');
}).once('exit', function () {
  process.exit();
});
