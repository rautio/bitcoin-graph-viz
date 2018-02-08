import winston from 'winston';
import fs from 'fs';

let dir = './logs/';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

winston.emitErrs = true;

let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: dir + 'all-logs.log',
            handleExceptions: true,
            json: true,
            maxSize: 524880, //5mb
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError:false
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

export default logger;
