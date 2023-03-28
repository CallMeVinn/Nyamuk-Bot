global.Config = require('./settings/config.json');

const NyamukBot = require('./structures/Client');

global.Client = new NyamukBot();

Client.setup();