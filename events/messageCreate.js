const { Events, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ParamInterface = require('../structures/ParamInterface');

module.exports = {
    name: Events.MessageCreate,
    execute: (client, message) => {
        if (message.author.bot) return;

        const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
        const rawContent = message.content.toLowerCase();

        const prefix = rawContent.match(prefixMention) ? rawContent.match(prefixMention)[0] : Config.prefix;
        if (!rawContent.startsWith(prefix.toLowerCase())) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const commands = client.commands.get(command) || client.commands.find(any => any.aliases && any.aliases.includes(command));

        if (!commands) return;

        const params = new ParamInterface(message, args);

        const embed = new EmbedBuilder({ color: 0xFF0000 });

        if (commands.category === "Developer" && message.author.id !== Config.developerId) return;

        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) return params.author.send({ embeds: [embed.setDescription(`I don't have permissions \`SendMessages\` at channel ${message.channel.toString()} in server **${message.guild.name}**`)] }).catch(o_O => void 0);
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.EmbedLinks)) return params.reply(`I need permissions \`EmbedLinks\` to execute my commands!`);

        const targetCooldown = `${params.author.id}_${commands.data.name}`;
        if (client.cooldowns.has(targetCooldown)) {
            const current = client.cooldowns.get(targetCooldown);
            params.reply({ content: `Kamu terlalu cepat menggunakan perintah ini. Coba lagi <t:${Math.round(current / 1000)}:R>`, ephemeral: true });
            return;
        }

        client.cooldowns.set(targetCooldown, (Date.now() + commands.cooldown));
        setTimeout(() => client.cooldowns.delete(targetCooldown), commands.cooldown);

        try {
            commands.execute(params);
        }
        catch(error) {
            params.reply({ embeds: [embed.setDescription(`**❌ |** Aku tidak menjalankan perintah ini. Karena: \`${error.message}\``)] });
        }
    }
}