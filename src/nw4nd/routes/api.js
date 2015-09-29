var express = require('express');
var router = express.Router();
var controller = require('../controllers/api.js');

/* GET home page. */

router.param('classBind',controller.classBindLoad);
router.param('methodBind',controller.methodBind);
router.route('/:classBind/:methodBind')
	.post(controller.launchMethod);

router.route('/:classBind/')
	.post(function(req,res){
		req.methodBindName = req.classBindName;
		delete req.classBindName;
		controller.launchMethod(req,res);
	});


module.exports = router;
