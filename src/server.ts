import app from './app';
import * as http from 'http';

var config = require('../ocms_config.js');

const port = 80;

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  function onListening() {
    let addr = server.address();  
    console.log('Listening on ' + port);
  }