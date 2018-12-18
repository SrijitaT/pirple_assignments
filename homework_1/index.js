var http = require('http');
var url = require('url');
var StringDecoder=require('string_decoder').StringDecoder;
var router=require('./routes');

var server = http.createServer(function(req, res) {
	var parsedUrl = url.parse(req.url, true);
	var path = parsedUrl.pathname;
	var trimmedPath=path.replace(/^\/+|\/+$/g,'');
	var method = req.method.toLowerCase();
        var headers=req.headers;

	var decoder=new StringDecoder('utf-8');
	var buffer="";
//request object emits data event when a http request is made
	req.on('data',function(data){
	buffer+=decoder.write(data);
	});
//end event is always going to get called but data eevent will not always get called
	req.on('end',function(){
	buffer+=decoder.end();

	var chosenHandler=router[trimmedPath]!=undefined?router[trimmedPath]:router.notFound;

	 var data={
	'trimmedPath':trimmedPath,
	'method':method,
	'headers':headers,
	'payload':buffer
	}

	chosenHandler(data,function(statusCode,payload){
		statusCode=typeof(statusCode)=='number'?statusCode:200;
		payload=typeof(payload)=='object'?payload:{};
		var payloadStr=JSON.stringify(payload);
		res.writeHead(statusCode);
		res.end(payloadStr);
                console.log('Returning this response', statusCode);
	})	
	})
	
});
server.listen(3000, function() {
	console.log('The server is listening on port 3000');
});



