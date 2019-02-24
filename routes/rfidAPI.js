const express = require('express');
const async = require('async')
const libMqtt = require('../libs/libMqtt');

const router = express.Router();

/*
 * RFID API
*/
router.get('/getAntenna', function(req, res) {
	let logicPort = parseInt(req.query.logicPort);
	async.series([
		(next)=>{
			libMqtt.getAntenna(logicPort, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.post('/setAntenna', function(req, res) {
	let data = JSON.parse(req.body.data);
	async.series([
		(next)=>{
			libMqtt.setAntenna(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.get('/getAlgorithm', function(req, res) {
	let type = req.query.type;
	async.series([
		(next)=>{
			libMqtt.getAlgorithm(type, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.post('/setAlgorithm', function(req, res) {
	let data = JSON.parse(req.body.data);
	async.series([
		(next)=>{
			libMqtt.setAlgorithm(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.get('/getMask', function (req, res) {
    let index = parseInt(req.query.index);
    async.series([
        (next)=>{
            libMqtt.getMask(index, (result)=>{
                data = result;
                next();
            });
        }
    ],(errs, results)=>{
        res.send(data);
    });
});
router.post('/setMask', function(req, res) {
	let data = JSON.parse(req.body.data);
	async.series([
		(next)=>{
			libMqtt.setMask(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.post('/inventoryAction', function (req, res) {
    let action = JSON.parse(req.body.data).action;
    async.series([
        (next)=>{
            libMqtt.inventory(action, (result)=>{
                data = result;
                next();
            });
        }
    ],(errs, results)=>{
        res.send(data);
    });
});
router.get('/getInvData', function (req, res) {
    let data = req.query.data;
    console.log(data);
    async.series([
        (next)=>{
            libMqtt.getInvData(data, (result)=>{
                data = result;
                next();
            });
        }
    ],(errs, results)=>{
        res.send(data);
    });
});
router.post('/readTag', function (req, res) {
    let data = JSON.parse(req.body.data);
    async.series([
        (next)=>{
            libMqtt.readTag(data, (result)=>{
                data = result;
                next();
            });
        }
    ],(errs, results)=>{
        res.send(data);
    });
});
router.post('/writeTag', function (req, res) {
    let data = JSON.parse(req.body.data);
    async.series([
        (next)=>{
            libMqtt.writeTag(data, (result)=>{
                data = result;
                next();
            });
        }
    ],(errs, results)=>{
        res.send(data);
    });
});

module.exports = router;
