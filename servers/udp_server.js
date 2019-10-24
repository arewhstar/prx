module.exports = 
function (address,port,routes){
		const dgram = require('dgram');
		const udp_server = dgram.createSocket('udp4');
		udp_server.on('error', (err) => {
  			console.log(`server error:\n${err.stack}`);
  			udp_server.close();
		});
		udp_server.on('message', (msg, rinfo) => {
  			//console.log(`UDP_listener got: ${msg} from ${rinfo.address}:${rinfo.port}`);
			
			//const destination = cluster.getHosts();
			for(var route in routes){
				//udp_send(msg,rinfo,routes[route]);
				//udp_server.send("From Listener",hosts[i].port,hosts[i].address);// ,(err) => { console.log("error");});
			



		//Empty uplink and downlink
		
		if(routes[route].getUplink().length == 0 && routes[route].getDownlink().length == 0){
			console.log("To cluster");
			//sendcluster
			udp_server.send(msg,routes[route].getCluster().getRandomport(),routes[route].getCluster().getRandomaddress());
		}
		//Empty downlink
		
		if(routes[route].getUplink().length != 0 && routes[route].getDownlink().length == 0){
			console.log("Uplink");/*
			var senduplink1 =true;
			for(var up_i = 0; up_i < routes[route].getUplink().length;up_i++){
				if(rinfo.port == routes[route].getUplink()[up_i].getRandomport() && rinfo.address == routes[route].getUplink()[up_i].getRandomaddress()){
					senduplink1 =false;
					if(up_i == routes[route].getUplink().length-1){
						//sendcluster
						udp_server.send(msg,routes[route].getCluster().getRandomport(),routes[route].getCluster().getRandomaddress());
					}
					else{
						//sendup+1
						udp_server.send(msg,routes[route].getUplink()[up_i+1].getRandomport(),routes[route].getUplink()[up_i+1].getRandomaddress());
					}
				}
			}
			if(senduplink1){
				//sendup1   
				udp_server.send(msg,routes[route].getUplink()[0].getRandomport(),routes[route].getUplink()[0].getRandomaddress());
			}
		*/}
		//Empty uplink
		
		if(routes[route].getUplink().length == 0 && routes[route].getDownlink().length != 0){
			console.log("Downlink");
			/*var senddownlink1 =true;
			for(var down_i = 0; down_i < routes[route].getDownlink().length;down_i++){
				if(rinfo.port == routes[route].getDownlink()[down_i].getRandomport() && rinfo.address == routes[route].getDownlink()[down_i].getRandomaddress()){
					senddownlink1=false;
					if(down_i == routes[route].getDownlink().length-1){
						//sendcluster
						udp_server.send(msg,routes[route].getCluster().getRandomport(),routes[route].getCluster().getRandomaddress());
					}
					else{
						//senddown+1
						udp_server.send(msg,routes[route].getDownlink()[down_i+1].getRandomport(),routes[route].getDownlink()[down_i+1].getRandomaddress());
					}
				}
			}
			if(senddownlink1){
				//senddown1   
				udp_server.send(msg,routes[route].getDownlink()[0].getRandomport(),routes[route].getDownlink()[0].getRandomaddress());
			}
		*/}
		//Not empty
		if(routes[route].getUplink().length != 0 && routes[route].getDownlink().length != 0){
			console.log("Uplink & Downlink");
			//console.log("Up:"+routes[route].getUplink()[0].getName());
			//console.log("Down:"+routes[route].getDownlink()[0].getName());
			//console.log(routes[route].getCluster().getName());
			console.log(`UDP_listener got: ${msg} from ${rinfo.address}:${rinfo.port}`);
			var senduplink1 =true;
			for(var up_i = 0; up_i < routes[route].getUplink().length;up_i++){
				if((rinfo.port == routes[route].getUplink()[up_i].getRandomport()) && (rinfo.address == routes[route].getUplink()[up_i].getRandomaddress())){
					senduplink1 =false;
					if(up_i == routes[route].getUplink().length-1){
						//senddown1
						console.log(routes[route].getDownlink()[0].getRandomaddress()+":"+routes[route].getDownlink()[0].getRandomport());
						udp_server.send(msg,routes[route].getDownlink()[0].getRandomport(),routes[route].getDownlink()[0].getRandomaddress());
					}
					else{
						//sendup+1
						udp_server.send(msg,routes[route].getUplink()[up_i+1].getRandomport(),routes[route].getUplink()[up_i+1].getRandomaddress());
					}
				}

			}
			for(var down_i = 0; down_i < routes[route].getDownlink().length;down_i++){
				if(rinfo.port == routes[route].getDownlink()[down_i].getRandomport() && rinfo.address == routes[route].getDownlink()[down_i].getRandomaddress()){
					senduplink1 =false;
					if(down_i == routes[route].getDownlink().length-1){
						//sendcluster
						udp_server.send(msg,routes[route].getCluster().getRandomport(),routes[route].getCluster().getRandomaddress());
					}
					else{
						//senddown+1
						udp_server.send(msg,routes[route].getDownlink()[down_i+1].getRandomport(),routes[route].getDownlink()[down_i+1].getRandomaddress());
					}
				}
			}
			if(senduplink1){
				//sendup1
				console.log(routes[route].getUplink()[0].getRandomaddress()+":"+routes[route].getUplink()[0].getRandomport());
				udp_server.send(msg,routes[route].getUplink()[0].getRandomport(),routes[route].getUplink()[0].getRandomaddress());
			}
		}
		}//foreach route end
		});

		udp_server.on('listening', () => {
  			console.log(`Waiting for UDP at: ${address}:${port}`);
			
		});
		udp_server.bind(port,address);//41234




}
