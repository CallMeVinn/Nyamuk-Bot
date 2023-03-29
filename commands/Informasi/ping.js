const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mengirim latensi bot.'),

    execute: function(ci) {
        ci.send('...').then(msg => {
            msg.edit(`Pong! \`${msg.createdTimestamp-ci.createdTimestamp}\` ms.`);
        })
    }
}