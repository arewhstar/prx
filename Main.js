const Listener = require('./Listener.js');
const Cluster = require('./Cluster.js');
const Route = require('./Route.js');
const rest = require('./input/server_rest.js');
const fs = require('fs');

//let data = fs.readFileSync('./input/config/config.json');
//let lcfg = JSON.parse(data);

rest();
var restdata = fs.readFileSync('./input/config/config_test.json');
var restcfg = JSON.parse(restdata);
var listeners = [];
var clusters = [];
var routes = [];

for(l in restcfg.listeners){
	listeners.push(new Listener(restcfg.listeners[l],"udp"));
}
for(c in restcfg.clusters){
	console.log(restcfg.clusters[c]);
	clusters.push(new Cluster(restcfg.clusters[c]));
}
for(r in restcfg.routes){
	console.log(r);
	var route = new Route(restcfg.routes[r].name);
	for(l in listeners){
		if(restcfg.routes[r].listener==listeners[l].getName()){
			route.setListener(listeners[l]);
		}
	}
	for(c in clusters){
		if(restcfg.routes[r].cluster==clusters[c].getName()){
			route.setCluster(clusters[c]);
		}
		for(up in restcfg.routes[r].transform.uplink){
			if(restcfg.routes[r].transform.uplink[up]==clusters[c].getName()){
				route.addUplink(clusters[c]);
			}
		}
		for(down in restcfg.routes[r].transform.downlink){
			if(restcfg.routes[r].transform.downlink[down]==clusters[c].getName()){
				route.addDownlink(clusters[c]);
			}
		}
	}
	routes.push(route);

}
console.log("listeners: "+listeners.length+" clusters: "+clusters.length+" routes: "+routes.length);
listeners[0].listen([routes[0]]);
/*
var li_http = new Listener(lcfg["listeners"],"http");
var li_udp = new Listener(lcfg["listeners"],"udp");
var li_ws  = new Listener(lcfg["listeners"],"ws");
var cluster1 = new Cluster("cluster1");
cluster1.addHost("localhost",41235);

//Work
li_http.listen(cluster1);
li_udp.listen(cluster1);
li_ws.listen(cluster1);
*/
setInterval(()=>{
var inputsize = fs.statSync('./input/config/config_test_out.json')["size"];
var outputsize = fs.statSync('./input/config/config_test_out_2.json')["size"];

if(inputsize != outputsize){
var update = fs.readFileSync('./input/config/config_test_out_2.json');
fs.writeFileSync('./input/config/config_test_out.json',update);


console.log("Config update happened!");
}
},1000);


