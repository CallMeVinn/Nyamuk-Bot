const { EmbedBuilder, SlashCommandBuilder } = require('discord.js'),
Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Evaluate code for developer testing"),

    execute: async function(p) {
        if (!p.args.length) return p.message.react("❌");

        const code = p.args.join(" ");
        const embed = new EmbedBuilder({ color: Discord.Colors.Blue });

        try {

            let evaled = await eval(code);
                evaled = clean(evaled);

            embed.setDescription(`\`\`\`js\n${evaled}\`\`\``);

            p.reply({ embeds: [embed] });
        }
        catch (error) {
            embed.setColor(Discord.Colors.Red);
            embed.setDescription(`**❌ Error!**\`\`\`js\n${clean(error)}\n\`\`\``);

            p.reply({ embeds: [embed] });
        }
    }
};

function clean(values) {
    if  (typeof values === "string") {
        return values
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
    }
    else {
        return require('node:util').inspect(values, { depth: 0 });
    }
};