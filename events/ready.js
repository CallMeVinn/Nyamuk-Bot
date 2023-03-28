const { ActivityType, Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute: (client) => {
        client.user.setActivity({
            name: `${Config.prefix}help | /help`,
            type: ActivityType.Listening
        });

        console.log(`[ClientReady] Logged in as ${client.user.tag}`);
    }
}