const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mengirim latensi bot.'),

    execute: function(p) {
        p.reply('...').then(msg => {
            msg.edit(`Pong! \`${msg.createdTimestamp-p.createdTimestamp}\` ms.`);
        })
    }
}