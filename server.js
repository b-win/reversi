
/* set up the static file server */
let static - require('node-static');

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