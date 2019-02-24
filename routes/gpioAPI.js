const express = require('express');
const async = require('async')
const libMqtt = require('../libs/libMqtt');

const router = express.Router();

router.get('/command', function(req, res) {
	let command = req.query.command;
	async.series([
		(next)=>{
			libMqtt.command(command, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.post('/gpioConf', function(req, res) {
	let data = JSON.parse(req.body.data);
	async.series([
		(next)=>{
			libMqtt.gpioConf(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.post('/gpioStatus', function(req, res) {
	let data = JSON.parse(req.body.data);
	async.series([
		(next)=>{
			libMqtt.gpioStatus(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});

module.exports = router;
