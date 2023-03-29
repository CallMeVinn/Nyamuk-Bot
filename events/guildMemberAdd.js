const { EmbedBuilder, Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    execute: async (client, member) => {
        const embed = new EmbedBuilder()
            .setColor(Config.color)
            .setAuthor({ name: member.guild.name })
            .setTitle("𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐒𝐀𝐑𝐀𝐍𝐆 𝐍𝐘𝐀𝐌𝐔𝐊")
            .setDescription(`Selamat bergabung menjadi keluarga baru kami **${member.user.tag}** - Kamu member ke **${member.guild.memberCount}** di server ini.`)
            .setThumbnail(member.guild.iconURL({ dynamic: true, size: 1024 }));

        const channel = client.channels.cache.get(Config.channels.welcome);
        channel.send({ embeds: [embed] });
    }
}