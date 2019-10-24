module.exports = 
class Listener {
	constructor(config,protocol){
		this.name=config.name;
		this.address=config.address;
		this.port=config.port;
		this.protocol=protocol;
		this.filter_chains= config.filter_chains;//list
		this.per_connection_buffer_limit_bytes=config.per_connection_buffer_limit_bytes;
		this.metadata=config.metadata;
		this.listener_filters=config.listener_filters;//list
		this.socket_options=config.socket_options;

	}
	info(){
		console.log(`
name:${this.name}
address:${this.address}
port:${this.port}
filter_chains:${this.filter_chains}
per_connection_buffer_limit_bytes:${this.per_connection_buffer_limit_bytes}
metadata:${this.metadata}
listener_filters:${this.listener_filters}
socket_options:${this.socket_options}
			`)
	}
	update(config){
		this.name=config.name;
		this.address=config.address;
		this.port=config.port;
		//this.protocol=protocol;
		this.filter_chains= config.filter_chains;//list
		this.per_connection_buffer_limit_bytes=config.per_connection_buffer_limit_bytes;
		this.metadata=config.metadata;
		this.listener_filters=config.listener_filters;//list
		this.socket_options=config.socket_options;
	}

	listen(routes){

		switch(this.protocol){
			case "http":
				const http_server = require('./servers/http_server.js');
				//http_server(this.address,this.port,routes);
			break;
			case "udp":
				const udp_server = require('./servers/udp_server.js');
				udp_server(this.address,this.port,routes);
			break;
			case "ws":
				const ws_server = require('./servers/ws_server.js');
				//ws_server('0.0.0.0',8080,routes);
			break;

			default:
				console.log("ERROR:Cannot start servers.")
}

	}
	terminate(){
		console.log(this.name + " Listener not running!");
	}
	getName(){
		return this.name;
	}


}

