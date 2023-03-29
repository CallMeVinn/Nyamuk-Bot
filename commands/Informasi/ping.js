const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mengirim latensi bot.'),

    execute: async function(p) {
        if (p.isInteraction) p.createdTimestamp = await Date.now();

        p.reply('...').then(msg => {
            msg.edit(`Pong! \`${msg.createdTimestamp-p.createdTimestamp}\` ms.`);
        })
    }
}