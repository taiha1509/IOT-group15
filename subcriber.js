const http = require('http');

const hostname = '127.0.0.1';

const port = 3002;

const mqtt = require('mqtt');

const connect_options={
	clientId:"mqttjs01",
	username:"taiha",
	password:"123456",
	clean:false
}

const client  = mqtt.connect("mqtt://test.mosquitto.org",connect_options);


// this function will be called when connect to broker successfully
client.on("connect",function(){	
console.log("connected");
})

//catch authentication failures
client.on("error", function(error){
	console.log("Can't connect because this error:" + error);
})

const topic = "testtopic";
client.subscribe(topic);

client.on('message',function(topic, message, packet){
	console.log("message is "+ message);
	console.log("topic is "+ topic);
});

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('this is the response text');
	});

server.listen(port, hostname, ()=> {
	console.log('Server subcriber running at http://${hostname}:${port}');
})
