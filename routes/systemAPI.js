const express = require('express');
const async = require('async');
const multer = require('multer');
const fs = require('fs');
const exec = require('child_process').exec;

const libMqtt = require('../libs/libMqtt');

const router = express.Router();
const storage = multer.diskStorage({
	destination:'/opt/MTI_Adventurer/sys_upgrade/',
	filename:function (req, file, cb) {
		 cb(null, file.originalname);
	 },
});
const upload = multer({ storage: storage });

router.get('/getNetworkInfo', function(req, res) {
	let data = JSON.parse(req.query.data);
	async.series([
		(next)=>{
			libMqtt.getNetworkInfo(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.post('/setNetworkInfo', function(req, res) {
	let data = JSON.parse(req.body.data);
	async.series([
		(next)=>{
			libMqtt.setNetworkInfo(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.get('/getBoardData', function(req, res) {
	let data = JSON.parse(req.query.data);
	async.series([
		(next)=>{
			libMqtt.getBoardData(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.post('/setWiFiInfo', function(req, res) {
	let data = JSON.parse(req.body.data);
	async.series([
		(next)=>{
			libMqtt.setWiFiInfo(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.get('/version', function(req, res) {
	let type = req.query.type;
	async.series([
		(next)=>{
			libMqtt.version(type, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.get('/uptime', function (req, res) {
    let type = req.query.type;
	async.series([
		(next)=>{
			libMqtt.uptime(type, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.get('/topicList', function (req, res) {
    fs.readFile('/etc/systemd/adventurer.conf', function (error, data) {
        if (error) {
            res.json({error: "Read adventurer.conf file failed"});
            return;
        }
        let topicConf = data.toString().split('\n');
        let topicList = [];
        for (let i = 0; i < topicConf.length; i++) {
            if(topicConf[i] === "[Manager]"){
                let j = i+1;
                while (topicConf[j] !== '') {
                    topicList.push({
                        topic: topicConf[j]
                    })
                    j++;
                }
                break;
            }
        }
        res.json({list: topicList});
    });
});
router.post('/topicConf', function (req, res) {
    let topicName = JSON.parse(req.body.data).topic;
    if(topicName == ''){
        topicName = 'raspberry/raspberry/';
    }
    let topicStr = `DEV_TOPIC=${topicName}\nGPIO_TOPIC=${topicName}GPIO/\nRFID_TOPIC=${topicName}RFID/\n`;

    async.waterfall([
        (next)=>{
            fs.readFile('/etc/systemd/adventurer.conf', function (error, data) {
                if (error) {
                    res.json({error: "Read adventurer.conf file failed"});
                    return;
                } else {
                    let topicConf = data.toString().split('\n');
                    let temp = "";
                    for (let i = 0; i < topicConf.length; i++) {
                        temp += topicConf[i]+'\n';
                        if(topicConf[i] === "[Manager]"){
                            i++;
                            temp += topicStr;
                            break;
                        }
                    }
                    next(null, temp);
                }
            });
        },
        (temp, next)=>{
            fs.writeFile('/etc/systemd/adventurer.conf', temp, function (err) {
                if (err){
                    res.json({error: "Read adventurer.conf file failed"});
                    return;
                } else {
                    next();
                }
            });
        },
        (next)=>{
            exec(`service adventurer restart`, (error, stdout, stderr)=>{
                if (error !== null) {
                    console.error(`exec error: ${error}`);
                    res.json({error: `exec error: ${error}`});
                    return;
                }
                next();
            });
        },
        (next)=>{
            exec(`service webAPI restart`, (error, stdout, stderr)=>{
                if (error !== null) {
                    console.error(`exec error: ${error}`);
                    res.json({error: `exec error: ${error}`});
                    return;
                }
                next();
            });
        },
    ],(errs, results)=>{
        res.json({data:"Change topic define successful!"});
    });
});
router.get('/sensorList', function(req, res) {
	let data = JSON.parse(req.query.data);
    console.log(data);
	async.series([
		(next)=>{
			libMqtt.sensorList(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.post('/sensorConf', function(req, res) {
	let data = JSON.parse(req.body.data);
	async.series([
		(next)=>{
			libMqtt.sensorConf(data, (result)=>{
				data = result;
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});
router.post('/upgrade',upload.single('MTI'), function(req, res){
    let file = req.file;
    let crcCheck;
    if (!file) {
        res.json({ error: "upgrade failed!, No file to upgrade" });
        return;
    }
    const UPGRADE_PWD = file.destination;
    const UPGRADE_FOLDER = `${UPGRADE_PWD}adventurer`

    async.waterfall([
        (next)=>{
            exec(`tar -C ${UPGRADE_PWD} -zxf ${file.path} `, (error, stdout, stderr)=>{
                if (error !== null) {
                    console.error(`exec error: ${error}`);
                    res.json({error: `exec error: ${error}`});
                    return;
                }
                next();
            });
        },
        (next)=>{
            exec(`md5sum ${UPGRADE_PWD}adventurer.tar.gz`, (error, stdout, stderr)=>{
                if (error !== null) {
                    console.error(`exec error: ${error}`);
                    res.json({error: `exec error: ${error}`});
                    return;
                }
                uploadCRC = stdout.split('  ')[0];
                crcCheck = JSON.parse(fs.readFileSync(`${UPGRADE_PWD}systemInfo`, 'utf8'));
                if (crcCheck.CRC !== uploadCRC) {
                    console.error(crcCheck.CRC);
                    console.error(uploadCRC);
                    console.error('CRC is not correct!');
                    res.json({error: 'CRC is not correct!'});
                    return;
                } else {
                    next();
                }
            });
        },
        (next)=>{
            exec(`tar -C ${UPGRADE_PWD} -zxf ${UPGRADE_PWD}adventurer.tar.gz`, (error, stdout, stderr)=>{
                if (error !== null) {
                    console.error(`exec error: ${error}`);
                    res.json({error: `exec error: ${error}`});
                    return;
                }
                next();
            });
        },
        (next)=>{
            console.error("test1");
            exec(`sh ${UPGRADE_FOLDER}/MTI-gateway-uninstall.sh;sh ${UPGRADE_FOLDER}/MTI-gateway-install.sh;`, (error, stdout, stderr)=>{
                console.error("test2");
                if (error !== null) {
                    console.error(`exec error: ${error}`);
                    res.json({error: `exec error: ${error}`});
                    return;
                }
                next();
            });
        }
    ],(errs, results)=>{
        res.json({data:"upgrade Successful!"});
    });
});


module.exports = router;
