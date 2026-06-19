const fs = require('fs');
const path = require('path');
const { getTimestamp } = require('./timeStamp');

const logsDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir,`${getTimestamp()}.log`);

const logger = {
    info: (message) => {
        const logMessage =
            `[INFO] [${new Date().toISOString()}] ${message}\n`;

        console.log(logMessage.trim());

        fs.appendFileSync(logFile, logMessage);
    },

    error: (message) => {
        const logMessage =
            `[ERROR] [${new Date().toISOString()}] ${message}\n`;

        console.error(logMessage.trim());

        fs.appendFileSync(logFile, logMessage);
    }
};
module.exports = { logger };