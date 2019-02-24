const redis = require('redis');
const RDS_PORT = 6379,
      RDS_HOST = '127.0.0.1',
      RDS_OPTS ={},
      client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.on('ready', function () {
    console.log('Redis is ready!' + " - " + new Date().toISOString());
})

client.on("error", function (err) {
    console.log(err + " - " + new Date().toISOString());
});

client.on('connect',function () {
    console.log('API Server is connected to redis!' + " - " + new Date().toISOString());
})

module.exports = {client:client, reids: redis};
