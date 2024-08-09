const redis = require("redis");


var Connect = function () {
  var client = redis.createClient({
    host: process.env.REDIS_URL,
    database: process.env.REDIS_DB,
    socket: {
      connectTimeout: 30000
    }
  });

  client.on("connect", function () {
    console.log("redis connected");
  });

  client.on("error", console.error.bind(console, "redis connection error:"));

  return {
    connect: client.connect(),
    client: client,
    expiry: process.env.REDIS_TTL,
  };
};

module.exports = Connect();
