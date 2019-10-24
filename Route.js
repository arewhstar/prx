module.exports = 
class Route {
	constructor(name){
		this.name=name;
		this.listener;
  		this.cluster;
  		this.uplink=[];
		this.downlink= [];//list

	}
	info(){}
	setListener(listener){
	this.listener=listener;
	}
	setCluster(cluster){
	this.cluster=cluster;
	}
	addUplink(cluster){
		this.uplink.push(cluster);
	}
	addDownlink(cluster){
		this.downlink.push(cluster);
	}

	getListener(){
		return this.listener;
	}
	getCluster(){
		return this.cluster;
	}
	getUplink(){
		return this.uplink;
	}	
	getDownlink(){
		return this.downlink;
	}
	getName(){
		return this.name;
	}
}
