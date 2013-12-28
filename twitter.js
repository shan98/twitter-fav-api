http = require('http');
fs = require('fs');
path = require('path');

var port = 8000;
var STATIC_PREFIX  = '/static/';
var sum = 0;
var s = http.createServer(function(req, res){
	var url = req.url;
	
	
	
	if(url === '/'){
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.readFile(__dirname + '/index.html', function(err, data){
			if(err){
				throw err;
			}else{
				res.end(data);
			}
		});
	}else if(url.indexOf(STATIC_PREFIX) === 0){
		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.readFile(__dirname + '/'+ path.basename(url), function(err, data){
			if(err){
				throw err;
			}else{
				res.end(data);
			}
		});
	}else if(url === '/inc'){
		sum++;
		res.writeHead(200, {'content-type':'text/html'})
		res.end(sum.toString());
	}else{
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.end('FILE not FOUND\n');
	}
	
		
});

s.listen(port);
