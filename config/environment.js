const fs = require('fs');
const rfs = require('rotating-file-stream').createStream;
const path = require('path');

const logDirectory = path.join(__dirname, '../production_log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

console.log(rfs);
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});

const development = {
  name: 'development',
  db: 'jaivik_jaayaka_development',
  smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'dheeraj77253@gmail.com', // generated ethereal user
      pass: '7253@Dheeraj', // generated ethereal password
    },
  },
  jwt_secret: 'jaivik-jaayaka',
  morgan: {
    mode: 'dev',
    options: { stream: accessLogStream },
  },
  mongoAtlas: {
    user: 'jevik-zayka-user',
    password: '7253@Dheeraj',
  },
  redisURL:
    'redis://h:p7351bb546d4ea0146ca0797794bbd553c0e9d603499044b3c871105b0ac62229@ec2-54-80-170-250.compute-1.amazonaws.com:23779',
};

const production = {
  name: 'production',
  db: 'jaivik_jaayaka_production',
  smtp: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.JAIVIK_EMAIL, // generated ethereal user
      pass: process.env.JAIVIK_EMAIL_PASSWORD, // generated ethereal password
    },
  },
  jwt_secret: process.env.JAIVIK_JWT_SECRET,
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
  mongoAtlas: {
    user: process.env.JAIVIK_MONGO_USERID,
    password: process.env.JAIVIK_MONGO_PASSWORD,
  },
  redisURL: process.env.REDIS_URL,
};

module.exports =
  eval(process.env.JAIVIK_ENVIRONMENT) == undefined ? development : development;
