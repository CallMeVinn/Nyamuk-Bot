const { ActivityType, Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute: function(client) {
        client.user.setActivity({
            name: "Sarang Nyamuk",
            url: Config.serverLink,
            type: ActivityType.Streaming
        });

        console.log(`[ClientReady] Logged in as ${client.user.tag}`);
    }
}