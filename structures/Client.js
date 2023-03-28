const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { readdirSync } = require('node:fs');

class NyamukBot extends Client {
    constructor() {
        super({
            allowedMentions: {
                parse: [
                    'everyone',
                    'roles',
                    'users'
                ],
                repliedUser: false,
            },
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ]
        });

        this.commands = new Collection();
        this.cooldowns = new Collection();

        this.on('error', (error) => console.error(error));
        this.on('warn', (info) => console.warn(info));

        this.handlers();
    }
    handlers() {
        readdirSync('./handlers')
            .forEach(file => {
                require(`../handlers/${file}`).load(this);
                console.log('[Handler]', `File '${file.split('.')[0]}' loaded.`);
            });
    }
    setup() {
        super.login(process.env.Token);
    }
}

module.exports = NyamukBot;