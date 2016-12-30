'use strict';


const http =require('http');
const url =require('url');

let routes = {
	'GET':{
		'/':(res, req)=>{
			res.writeHead(200,{'Content-type': 'text/html'});
			res.end('<h1><b>hello NodeJS</b></h1>');
		},
		'/about':(res, req)=>{
			res.writeHead(200,{'Content-type': 'text/html'});
			res.end('<h1><b>This is abouts  NodeJS</b></h1>');
		},
		'/api/getinfo':(res, req)=>{
			//res.writeHead(200,{'content-type':'text/html'});
			res.writeHead(200,{'Content-type': 'application/json'});
			res.end(JSON.stringify(req.queryParams));

		},
		'/api/test':(res,req)=>{
		
					res.writeHead(413,{'Content-type': 'text/html'});
					res.write('testing working');
					res.end("testing");
					req.connection.destroy();			


		}
	},
	'POST':{
		'/api/uploadfile':(res,req)=>{
			let body='';
			req.on('data',data=>{
				body+=data;
				
				if(body.length > 2097152){
					console.log("destroy");

					res.writeHead(413,{'Content-type': 'text/html'});					
					res.end('the file size exceed the upload limit 2 Mb');
					req.connection.destroy();
				}else{
					console.log("Body size",body.length);
				}

			});

			
		},
		'/api/test':(res,req)=>{
		
					res.writeHead(413,{'Content-type': 'text/html'});
					res.write('testing working');
					res.end("testing");
					req.connection.destroy();	


		}
	},
	'NA':(res, req)=>{
		res.writeHead(404,{'content-type':'text/html'});
			res.end('<h1><b>Page can not found</b></h1>');
	}
}

function router(req,res){

	let baseURI=url.parse(req.url,true);

	let resoleRoute=routes[req.method][baseURI.pathname]

	if(resoleRoute!=undefined){
		req.queryParams=baseURI.query;
		resoleRoute(res,req);
	}else{
		routes['NA'](res,req);
	}
	console.log('Requested Method',req.method);
	console.log('Requested',baseURI);
	res.writeHead(200,{'content-type':'text/html'});
	res.end('<h1><b>hello NodeJS</b></h1>');

}
 

http.createServer(router).listen(8089,()=>console.log('server run on port 8089'));