module.exports=
function(){
const http = require('http');
const app_rest = require('./app_rest');
const server_rest = http.createServer(app_rest);
server_rest.listen(8888);
console.log("REST : localhost:8888");
}
