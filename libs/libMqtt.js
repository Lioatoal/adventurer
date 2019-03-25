/* MTI CONFIDENTIAL INFORMATION */

const mqtt = require('mqtt');
const url = require('url');
const exec = require('child_process').exec;
const uuidv4 = require('uuid/v4');
const async = require('async');
const fs = require('fs');

const mqtt_url = url.parse('mqtt://localhost:1883');
const auth = (mqtt_url.auth || 'mtiadmin:mtiadmin').split(':');

const options = {
  port: '1883',
  clientId: 'MTI_' + Math.random().toString(16).substr(2, 8),
  username: auth[0],
  password: auth[1],
};

const TOPIC = readTopicConfig();
const SYSTEM_CMD = TOPIC + "cmd";
const SYSTEM_CMD_REPLY = TOPIC + "cmdReply";
const RFID_CMD = TOPIC + "RFID/cmd";
const RFID_CMD_REPLY = TOPIC + "RFID/cmdReply";
const GPIO_CMD = TOPIC + "GPIO/cmd";
const GPIO_CMD_REPLY = TOPIC + "GPIO/cmdReply"
const TIMEOUT = 50;

const client = mqtt.connect('mqtt://localhost:1883', options);
var pubIDList = {};

client.on('connect', ()=>{ // When connected
    client.subscribe(SYSTEM_CMD_REPLY);
    client.subscribe(RFID_CMD_REPLY);
    client.subscribe(GPIO_CMD_REPLY);
});

client.on('message', (topic, message, packet)=>{
    if(topic === RFID_CMD_REPLY){
        let data = JSON.parse(message.toString());
        if(pubIDList[data.uuid]){
            if (data.response) {
                pubIDList[data.uuid] = data.response;
            } else {
                pubIDList[data.uuid] = data.description;
            }
        }
    } else if (topic === GPIO_CMD_REPLY){
        let data = JSON.parse(message.toString());
        if(pubIDList[data.uuid]){
            if (data.response) {
                pubIDList[data.uuid] = data.response;
            } else {
                pubIDList[data.uuid] = data.description;
            }
        }
    } else if (topic === SYSTEM_CMD_REPLY){
        let data = JSON.parse(message.toString());
        if(pubIDList[data.uuid]){
            if (data.response) {
                pubIDList[data.uuid] = data.response;
            } else {
                pubIDList[data.uuid] = data.description;
            }
        }
    }
});

const mqttClient = function(){};

/*
 * System API
*/
mqttClient.prototype.sensorList = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "command",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(SYSTEM_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.sensorConf = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "sensorConf",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(SYSTEM_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.getNetworkInfo = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "getNetworkInfo",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(SYSTEM_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.setNetworkInfo = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "setNetworkInfo",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(SYSTEM_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.setWiFiInfo = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "setWiFiInfo",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(SYSTEM_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.getBoardData = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "boardData",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(SYSTEM_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.version = function(type, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "version",
        request: {
            type: type
        }
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(SYSTEM_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.uptime = function(type, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "uptime",
        request: {
            type: type
        }
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(SYSTEM_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
/*
 * RFID API
*/
mqttClient.prototype.getAntenna = function(logicPort, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "getAntenna",
        request: {
            logicPort: logicPort
        }
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.setAntenna = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "setAntenna",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.getAlgorithm = function(type, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "getAlgorithm",
        request: {
            type: type
        }
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
};
mqttClient.prototype.setAlgorithm = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "setAlgorithm",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
};
mqttClient.prototype.getMask = function(index, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "getMask",
        request: {
            index: index
        }
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
};
mqttClient.prototype.setMask = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "setMask",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
};
mqttClient.prototype.inventory = function(action, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "inventory",
        request: {
            action: action
        }
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
};
mqttClient.prototype.getInvData = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "getInvData",
        request: {
            data: data
        }
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
};
mqttClient.prototype.setQueryTagGroup = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "setQueryTagGroup",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.setLinkProfile = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "setLinkProfile",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.setRegion = function(data, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "setRegion",
        request: data
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next(null);
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    });
};
mqttClient.prototype.readTag = function(read, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "readTag",
        request: read
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
};
mqttClient.prototype.writeTag = function(write, callback){
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "writeTag",
        request: write
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(RFID_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
};

/*
 * GPIO API
*/
mqttClient.prototype.command = function (command, callback) {
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "command",
        request: [{
            command: command
        }]
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(GPIO_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
}
mqttClient.prototype.gpioConf = function (config, callback) {
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "gpioConf",
        request: config
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(GPIO_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
}
mqttClient.prototype.gpioStatus = function (status, callback) {
    let count = TIMEOUT;
    let pubMes = {
        uuid: uuidv4(),
        function: "gpioStatus",
        request: status
    }
    let response = {};
    pubIDList[pubMes.uuid] = true;
    client.publish(GPIO_CMD, JSON.stringify(pubMes));

    async.series([
        function waitMQTT(next) {
            if (pubIDList[pubMes.uuid] !== true) {
                response = {data:pubIDList[pubMes.uuid]};
                next();
                delete pubIDList[pubMes.uuid];
            } else {
                if (count) {
                    setTimeout(waitMQTT, 100, next);
                    count -= 1;
                } else {
                    let timestamp = new Date();
                    next({error: `device is no response, timestamp : ${timestamp}`});
                }
            }
        }
    ],(errs, results)=>{
        if (errs) {
            callback(errs);
        } else {
            callback(response);
        }
    })
}

function readTopicConfig() {
    let topicFile = "", topicName = "";

    try {
        topicFile = fs.readFileSync('/etc/systemd/adventurer.conf', 'UTF8').toString().split('\n');
        for (let i = 0; i < topicFile.length; i++) {
            if(topicFile[i] === "[Manager]"){
                topicName = topicFile[i+1].split('=')[1];
                break;
            }
        }
    } catch (error) {
        topicName = 'respberry/raspberry/'
    }
    return topicName;
}

module.exports = new mqttClient();
