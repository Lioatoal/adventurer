const express = require('express');
const async = require('async')
const xlsx = require('xlsx');
const libMqtt = require('../libs/libMqtt');

const router = express.Router();
let flag = false;
let tagMap = {};
let simulationResult = [];
let simulationInterval = 0;
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
router.post('/setQueryTagGroup',function (req,res) {
    let data = JSON.parse(req.body.data);
    async.series([
        (next)=>{
            libMqtt.setQueryTagGroup(data, (result)=>{
                data = result;
                next();
            });
        }
    ],(errs, results)=>{
        res.send(data);
    });
});
router.post('/setLinkProfile',function (req,res) {
    let data = JSON.parse(req.body.data);
    async.series([
        (next)=>{
            libMqtt.setLinkProfile(data, (result)=>{
                data = result;
                next();
            });
        }
    ],(errs, results)=>{
        res.send(data);
    });
});
router.post('/setRegion',function (req,res) {
    let data = JSON.parse(req.body.data);
    async.series([
        (next)=>{
            libMqtt.setRegion(data, (result)=>{
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
                if (action == 'once') {
                    flag = true;
                    getInvData();
                    setTimeout(function () {
                        flag = false;
                    }, simulationInterval);
                }
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

/*
 * For RFID Simulation Test
*/
router.post('/performanceTest',function (req, res) {
    let data = JSON.parse(req.body.data);
    let antenna, algorithm, tagGroup, linkProfile;

    if (data.mode == 1) {
        antenna = {
            logicPort:0,
            status:1,
            physicalPort:0,
            dwellTime:2000,
            cycle:0,
            power:315
        };
        algorithm = {
            type: "dynamicQ",
            startQValue:8,
            minQValue:0,
            maxQValue:10,
            retryCount:0,
            toggleTarget:0,
            thresholdMultiplier:4
        };
        tagGroup = {
            selected:0,
            session:2,
            target:0
        };
        linkProfile = {
            linkProfile:3
        };
    }
    if (data.mode == 2) {
        antenna = {
            logicPort:0,
            status:1,
            physicalPort:0,
            dwellTime:2000,
            cycle:0,
            power:290
        };
        algorithm = {
            type: "fixedQ",
            QValue:9,
            retryCount:0,
            toggleTarget:0,
            repeatUntilNoTags:0
        };
        tagGroup = {
            selected:0,
            session:1,
            target:0
        };
        linkProfile = {
            linkProfile:3
        };
    }
	async.series([
		(next)=>{
			libMqtt.setAntenna(antenna, (result)=>{
                if (result.error) {
                    res.send(result)
                    return;
                }
				next();
			});
		},
        (next)=>{
			libMqtt.setAlgorithm(algorithm, (result)=>{
                if (result.error) {
                    res.send(result)
                    return;
                }
				next();
			});
		},
        (next)=>{
			libMqtt.setQueryTagGroup(tagGroup, (result)=>{
                if (result.error) {
                    res.send(result)
                    return;
                }
				next();
			});
		},
        (next)=>{
			libMqtt.setLinkProfile(linkProfile, (result)=>{
                if (result.error) {
                    res.send(result)
                    return;
                }
				next();
			});
		}
	],(errs, results)=>{
		res.json({data:"set Test Mode success!"});
	});
});
router.post('/tagMapImport', function (req, res) {
    var xlsxData = req.body;
    var worksheet = xlsx.read(xlsxData, {
        type: "buffer"
    });
    let tagMapIndex = 0;
    tagMap = {};

    for (const i in worksheet.Sheets) {
        var sheet = xlsx.utils.sheet_to_json(worksheet.Sheets[i]);
        for (let j = sheet.length; j >= 0; j--) {
            if(sheet[j]){
                tagMap[sheet[j].__EMPTY] = tagMapIndex++;
                tagMap[sheet[j].__EMPTY_1] = tagMapIndex++;
                tagMap[sheet[j].__EMPTY_2] = tagMapIndex++;
            }
        }
    }
    res.send("Successful!");
});
router.get('/tagMap', function(req,res){
    res.json(tagMap);
});
router.get('/simulation', function (req, res) {
    res.send(simulationResult);
    simulationResult = [];
});
router.post('/simulation', function (req, res) {
    let interval = req.body.data;
    simulationInterval = parseInt(interval);
    simulationInterval += 100;
    console.log(simulationInterval);
    res.send('Successful!');
});

function getInvData() {
    if (flag) {
        libMqtt.getInvData(["epc", "rssi", "count", "totalCount", "uniCount"], (result)=>{
            simulationResult.push(result);
        });
        setTimeout(function () {
            getInvData();
        },100);
    }
}
module.exports = router;
