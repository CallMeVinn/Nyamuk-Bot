const { EmbedBuilder, Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    execute: async (client, member) => {
        let username = member.user.username.length > 13 ? member.user.username.substr(0, 10)+'...' : member.user.username;
        username += member.user.discriminator;

        const welcomeImage = await WeebyAPI.custom.greeting({
            icon: member.user.displayAvatarURL({ dynamic: true, size: 1024, }).replace('.webp', '.png'),
            background: 'https://media.discordapp.net/attachments/812381804405194852/1090634509583650918/bg_transparent.png',
            name: username,
            greet: 'WELCOME',
            message: 'Semoga harimu menyenangkan.',
            font: 'riffic',
            circleHex: 'FFFFFF',
            greetHex: 'FFFFFF',
            nameHex: 'FFFFFF',
            messageHex: 'FFFFFF'
        });

        const embed = new EmbedBuilder()
            .setColor(Config.color)
            .setAuthor({ name: username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTitle("𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐒𝐀𝐑𝐀𝐍𝐆 𝐍𝐘𝐀𝐌𝐔𝐊")
            .setDescription(`Selamat bergabung menjadi keluarga baru kami. Kamu member ke **${member.guild.memberCount}** di server ini.`)
            .addFields({
                name: 'Verifikasi ⁉️',
                value:`> Baca: <#${Config.channels.rules}>\n> Isi Biodata: <#${Config.channels.biodata}>`
            })
            .setThumbnail(member.guild.iconURL({ dynamic: true, size: 1024 }))
            .setImage('attachment://welcome.png')
            .setTimestamp();

        const channel = client.channels.cache.get(Config.channels.welcome);
        channel.send({ content: `Hai ${member.user.toString()},`, embeds: [embed], files: [{ attachment: welcomeImage, name: 'welcome.png' }] });
    }
}