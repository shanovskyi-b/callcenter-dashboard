const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  require('./call-center-data-generator')
    .subscribe(data => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    });
});