module.exports = 
function (address,port,hosts){
		const WebSocket = require('ws');
		const wss = new WebSocket.Server({port:port});
		const ws_address = wss.address();
		console.log(`Waiting for WS at : ${ws_address.address}:${ws_address.port}`);
		wss.on('connection', function (ws) {
			console.log('WS_Client connected');
  			ws.on('message', function (message) {
    				console.log('WS_Listener got:', message);
  			});

  			ws.on('close', function () {
    				console.log('WS connection closed');
  			});
  			ws.on('error', function () {
    				console.log('Error');
  			});
  			ws.send('From WS_Listener:message');
			});
}
