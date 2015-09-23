var http = require('http');
var xmlrpc = require('xmlrpc');

// To accept unauthorized certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


// Class definition
function nw4n4d(){
    var _server=null;
}

nw4n4d.prototype.init = function init(){
  var self=this;
  console.log("[nw4n4d] Init");
  self._server=http.createServer();
  self._server.on('request', self.control);
  self._server.listen(7997);
}

nw4n4d.prototype.control = function control(req, resp){

  var self = this;

  console.log('[mw4n4d] Control running');

  // Getting Components from url
  var urlDecoded=decodeURIComponent(req.url);
  var components=urlDecoded.split('&');

  // Assume first component is callback
  var callback=(components[0].split("="))[1];

  // Assume second component as parameter list
  var args=JSON.parse(components[1]);
  var arglist=[];

  // if class is specified, let's add to n4d argument list
  console.log(args.class);
  //if ((args.class)!=undefined){args.args.unshift(args.class)}
  if ((args.class)!=undefined){arglist.push(args.class)}
  for (i in args.args) arglist.push(args.args[i]);

  var n4dCall= {"n4dMethod": args.method, "n4dArgs":arglist}

  console.log('[nw4n4d] callback: ',callback);
  console.log('[nw4n4d] N4dCall: ',n4dCall);

  // Formatting response to allow CORS
  resp.writeHead(200,
    {"content-type":"text/plain",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers":"x-requested-with, Content-Type, origin, authorization, accept, client-security-token",
    "Access-Control-Allow-Credentials": "true"
    });

  // The magic begins here: N4d local call.
  var client=xmlrpc.createSecureClient({host: 'localhost',rejectUnhauthorized : false, port: '9779'});

  // n4d call to method: methodCall (method, arglist)
  client.methodCall(n4dCall.n4dMethod,n4dCall.n4dArgs, function (error, value) {
    if (error) {
      console.log('[nw4n4d] Error:', error);
      console.log('[nw4n4d] Request Headers:', error.req && error.req._header);
      console.log('[nw4n4d] Error Code:', error.res && error.res.statusCode);
      console.log('[nw4n4d] Error Body:', error.body);
    } else {

      console.log(callback+'('+JSON.stringify(value)+')');
      resp.write(callback+'('+JSON.stringify(value)+')');

      resp.end();
    }
  });

}

nw4n4dServer=new nw4n4d();
nw4n4dServer.init();
