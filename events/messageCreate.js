const { Events, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ParamInterface = require('../structures/ParamInterface');

module.exports = {
    name: Events.MessageCreate,

    execute: async function(client, message) {
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

        if (commands.category === "Pengembang" && message.author.id !== Config.developerId) return;

        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) return message.author.send({ embeds: [embed.setDescription(`I don't have permissions \`SendMessages\` at channel ${message.channel.toString()} in server **${message.guild.name}**`)] }).catch(o_O => void 0);
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.EmbedLinks)) return message.reply(`I need permissions \`EmbedLinks\` to execute my commands!`);

        const targetCooldown = `${message.author.id}_${commands.data.name}_m`;
        if (client.cooldowns.has(targetCooldown)) {
            const current = client.cooldowns.get(targetCooldown);
            message.reply({ content: `Kamu terlalu cepat menggunakan perintah ini. Coba lagi <t:${Math.round(current / 1000)}:R>` }).then(msg => setTimeout(() => msg.delete(), (current-Date.now())))
            return;
        }

        client.cooldowns.set(targetCooldown, (Date.now() + commands.cooldown));
        setTimeout(() => client.cooldowns.delete(targetCooldown), commands.cooldown);

        try {
            commands.execute(params);
        }
        catch(error) {
            message.reply({ embeds: [embed.setDescription(`**❌ |** Aku tidak menjalankan perintah ini. Karena: \`${error.message}\``)] });
        }
    }
}