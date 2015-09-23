function classBindLoad(req,res,next,className){
	req.classBindName = className;
	next();
}

function methodBind(req,res,next,methodName){
	req.methodBindName = methodName;
	next();
}

function launchMethod(req,res){
	console.log("Class :" + req.classBindName);
	console.log("Method :" + req.methodBindName);
	var keys = Object.keys(req.body);
	keys.forEach(function(element){
		console.log(typeof req.body[element]);
		console.log(element + " " + req.body[element]);
	});
}

module.exports = {
	classBindLoad: classBindLoad,
	methodBind: methodBind,
	launchMethod: launchMethod
}