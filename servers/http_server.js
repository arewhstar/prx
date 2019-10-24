module.exports = 
function (address,port,hosts){
		const http = require("http");
		const net = require('net');
		const url = require('url');

		const http_server = http.createServer((req, res) => {
  		res.writeHead(200, { 'Content-Type': 'text/plain' });
  		res.end('okay');
		});
		http_server.on('connect', (req, cltSocket, head) => {
  			const srvUrl = url.parse(`http://${req.url}`);

  			const srvSocket = net.connect(srvUrl.port, srvUrl.hostname, () => {

    			cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node.js-Proxy\r\n' +
                    '\r\n');

    			srvSocket.write(head);
    			srvSocket.pipe(cltSocket);
    			cltSocket.pipe(srvSocket);
  		});
		console.log('HTTP_Client connected');
		});
		console.log(`Waiting for HTTP at : ${address}:${port}`);
		http_server.listen(port,address);
}
