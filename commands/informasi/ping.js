const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mengirim latensi bot.'),

    execute: function(ci) {
        ci.send('...').then(msg => {
            msg.edit(`Pong! \`${ci.createdTimestamp-msg.createdTimestamp}\` ms.`);
        })
    }
}