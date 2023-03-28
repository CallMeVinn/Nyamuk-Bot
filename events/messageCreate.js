const { Events, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const CommandInterface = require('../structures/CommandInterface');

module.exports = {
    name: Events.MessageCreate,
    execute: (client, message) => {
        if (message.author.bot) return;

        const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
        const rawContent = message.content.toLowerCase();
        Config.prefix = rawContent.match(prefixMention) ? rawContent.match(prefixMention)[0] : Config.prefix;
        if (rawContent.indexOf(Config.prefix.toLowerCase()) !== 0) return;

        const args = message.content.trim().slice(Config.prefix.length).split(/ +/g);
        const command = args.shift().toLowerCase();
        const commands = client.commands.get(command) || client.commands.find(any => any.aliases && any.aliases.includes(command));

        if (!commands) return;

        const commandInterface = new CommandInterface(message, args);

        const embed = new EmbedBuilder({ color: 0xFF0000 });

        if (commands.category === "Developer" && message.author.id !== Config.developerId) return;

        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) return message.author.send({ embeds: [embed.setDescription(`I don't have permissions \`SendMessages\` at channel ${message.channel.toString()} in server **${message.guild.name}**`)] }).catch(o_O => void 0);
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.EmbedLinks)) return commandInterface.send(`I need permissions \`EmbedLinks\` to execute my commands!`);

        const targetCooldown = `${commandInterface.author.id}_${commands.data.name}`;
        if (client.cooldowns.has(targetCooldown)) {
            const current = client.cooldowns.get(targetCooldown);
            commandInterface.send({ content: `Kamu terlalu cepat menggunakan perintah ini. Coba lagi <t:${Math.round(current / 1000)}:R>`, ephemeral: true });
            return;
        }

        client.cooldowns.set(targetCooldown, (Date.now() + commands.cooldown));
        setTimeout(() => client.cooldowns.delete(targetCooldown), commands.cooldown);

        try {
            commands.execute(commandInterface);
        }
        catch(error) {
            message.reply({ embeds: [embed.setDescription(`**❌ |** Aku tidak menjalankan perintah ini. Karena: \`${error.message}\``)] });
        }
    }
}