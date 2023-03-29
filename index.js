global.Config = require('./settings/config.json');

const WeebyAPI = require('weeby-js');
global.WeebyAPI = new WeebyAPI(process.env.WeebyToken);

process.on('unhandledRejection', (error) => console.error('[Unhandle_Rejection]', error));
process.on('uncaughtException', (error) => console.error('[Uncaught_Exception]', error));

const NyamukBot = require('./structures/Client');

global.Client = new NyamukBot();

Client.setup();