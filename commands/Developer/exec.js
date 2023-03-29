const { SlashCommandBuilder } = require('discord.js');
const { execSync } = require("node:child_process");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("exec")
        .setDescription("Execute a shell command"),

    aliases: ["$", ">"],

    execute: async function(p) {
        if (!p.args.length) return p.message.react('⁉️');
        await p.channel.sendTyping();

        try {
            const executed = execSync(p.args.join(" "));

            p.reply({ embeds: [{ color: 0x00ff00, title: `$ ${p.args.join(" ")}`, description: `\`\`\`shell\n${executed}\`\`\`` }] });
        }
        catch(error) {
            p.reply({ embeds: [{ color: 0xff0000, description: `I cannot executed $ \`${p.args.join(" ")}\` command. cause: ${error.message}` }] });
        }
    }
}