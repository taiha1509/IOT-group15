const http = require('http');

const hostname = '127.0.0.1';

const port = 3001;

const mqtt = require('mqtt');

const connect_options = {
	clientId: "mqttjs02",
	username: "taiha",
	password: "123456",
	clean: false
}

const client = mqtt.connect("mqtt://test.mosquitto.org", connect_options);


// this function will be called when connect to broker successfully
client.on("connect", function () {
	console.log("connected");
})

//catch authentication failures
client.on("error", function (error) {
	console.log("Can't connect because this error:" + error);
})

//client.end();

const publish_options = {
	retain: true,
	qos: 1,
}


var message = "test message";
var topic = "testtopic";
let count = 0;
//publish every 5 secs
var timer_id = setInterval(function () { publish(topic, message + count, publish_options); count++; }, 2000);

//publish function
function publish(topic, msg, options) {
	console.log("publishing", msg);
	if (client.connected == true) {
		client.publish(topic, msg, options);
	}
}
//client.publish("myTopic", "my message", publish_options);

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('this is the response text');
});

server.listen(port, hostname, () => {
	console.log('Server publisher running at http://${hostname}:${port}');
});

