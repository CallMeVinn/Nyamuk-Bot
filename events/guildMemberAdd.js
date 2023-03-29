const { EmbedBuilder, Events } = require('discord.js');ini

module.exports = {
    name: Events.GuildMemberAdd,
    execute: async (client, member) => {
        const embed = new EmbedBuilder()
            .setColor(Config.color)
            .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTitle("𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐒𝐀𝐑𝐀𝐍𝐆 𝐍𝐘𝐀𝐌𝐔𝐊")
            .setDescription(`Selamat bergabung menjadi keluarga baru kami. Kamu member ke **${member.guild.memberCount}** di server ini.`)
            .addFields({
                name: '⁉️ Verifikasi',
                value:`> Baca & Patuhi: <#${Config.channels.rules}>\n> Isi biodata (Wajib): <#${Config.channels.biodata}>`
            })
            .setThumbnail(member.guild.iconURL({ dynamic: true, size: 1024 }));

        const channel = client.channels.cache.get(Config.channels.welcome);
        channel.send({ content: `Hei ${member.user.toString()},`, embeds: [embed] });
    }
}