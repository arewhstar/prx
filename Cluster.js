module.exports = 
class Cluster {
	constructor(config){
		this.name=config.name;
		this.connect_timeout=config.connect_timeout;//ms
  		this.per_connection_buffer_limit_bytes=config.per_connection_buffer_limit_bytes;
  		this.lb_policy=config.lb_policy;
		this.hosts=[];//list
console.log(config.hosts);
		for(var i in config.hosts){
			var converthost = config.hosts[i].split(":");
			console.log(converthost[0]+converthost[1]);
			this.hosts.push({address:converthost[0],port:parseInt(converthost[1],10)});
		}
		
		this.health_checks=config.health_checks;
		this.circuit_breakers=config.circuit_breakers;
		this.socket_options=config.socket_options;
		this.metadata=config.metadata;
		this.filters=config.filters;//list
		this.params=config.params;
	}
	info(){}
	addHost(address,port){
		this.hosts.push({address:address,port:port});
	}
	listHosts(){
		for(var i = 0; i < this.hosts.length;i++){
			console.log(this.hosts[i].address+":"+this.hosts[i].port)
		}
	}
	removeHost(address,port){
		for(var i = 0; i < this.hosts.length;i++){
			if(this.hosts[i].address == address && this.hosts[i].port== port){
				this.hosts.splice(i,1);
			}
		}
	}
	getHosts(){
		return this.hosts;
	}
	getName(){
		return this.name;
	}
	getRandomaddress(){
		return this.hosts[0].address;
	}
	getRandomport(){
		return this.hosts[0].port;
	}
}
