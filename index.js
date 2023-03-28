global.Config = require('./settings/config.json');

process.on('unhandledRejection', (error) => console.error('[Unhandle_Rejection]', error));
process.on('uncaughtException', (error) => console.error('[Uncaught_Exception]', error));

const NyamukBot = require('./structures/Client');

global.Client = new NyamukBot();

Client.setup();