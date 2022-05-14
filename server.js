
/* set up the static file server */
let static = require('node-static');

/* set up the shttp server library */
let http = require('http');

/* Assume using heroku */
let port = process.env.PORT;
let directory = __dirname + '/public';

/* if not herok, adjust port and directory */
if ((typeof port == 'undefined') || (port === null)){
	port = 8080;
	directory = './public';
}

/* set up static file web server to deliver files from filesystem */
let file = new static.Server(directory);

let app = http.createServer(
	function(request, response){
		request.addListener('end',
			function(){
				file.serve(request,response);
			}
		).resume();
	}
).listen(port);


/* print server status */
console.log('The server is running');


/* Setting up web socket server */
const { Server } = require("socket.io");
const io = new Server(app);

io.on('connection', (socket) => {
	/* output a log message on the server and send it to client */

	function serverLog(...messages){
		io.emit('log', ['**** Message from the server: \n']);
		messages.forEach((item) => {
			io.emit('log',['****\t'+item]);
			console.log(item);
		});
	}

	serverLog('a page connected to the server: '+socket.id);

	socket.on('disconnect', () => {
		serverLog('a page disconnected from the server: '+socket.id);
	});
});