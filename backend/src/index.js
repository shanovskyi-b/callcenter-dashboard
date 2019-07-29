const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });

require('./call-center-data-generator')
  .subscribe(data => {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });


wss.on('connection', function open() {
});