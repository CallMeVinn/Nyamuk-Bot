const { EmbedBuilder, Events } = require("discord.js");
const ParamInterface = require('../structures/ParamInterface');

module.exports = {
    name: Events.InteractionCreate,

    execute: async function(client, interaction) {
        const embed = new EmbedBuilder({ color: 0xff0000 });
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                embed.setDescription(`Perintah \`/${interaction.commandName}\` tidak dapat dijalankan.`);

                interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }

            const params = new ParamInterface(interaction, interaction.options.data);

            if (command.category === "Pengembang" && interaction.user.id !== process.env.DeveloperId) {
                embed.setDescription("Kamu tidak bisa memakai perintah ini!");

                interaction.reply({ embeds: [embed], ephemeral: true })
                return;
            }

            const targetCooldown = `${interaction.user.id}_${command.data.name}_i`;
            if (client.cooldowns.has(targetCooldown)) {
                const current = client.cooldowns.get(targetCooldown);
                interaction.reply({ content: `Kamu terlalu cepat menggunakan perintah ini. Coba lagi <t:${Math.round(current / 1000)}:R>`, ephemeral: true });
                return;
            }

            cooldown.set(targetCooldown, (Date.now() + command.cooldown));
            setTimeout(() => client.cooldowns.delete(targetCooldown), command.cooldown);

            try {
                command.execute(params);
            } catch(error) {
                const info = `Kesalahan saat menjalankan '${interaction.commandName}'`;

                embed.setTitle(info);
                embed.setDescription(`Harap hubungi [developer](https://discord.com/users/${Config.developerId}) segera dan laporkan ini, terima kasih.`);

                console.log(`(${Math.round(Date.now() / 1000)})`, info, "di" + interaction.guild.id, error);

                interaction.reply({ embeds: [embed], ephemeral: true }).catch(_ => void 0);
            }
        }
        else if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) {
                embed.setDescription(`Perintah \`/${interaction.commandName}\` tidak dapat dijalankan.`);

                interaction.reply({ embeds: [embed], ephemeral: true });
                return;
            }
            if (command.category === "Pengembang" && interaction.user.id !== process.env.DeveloperId) {
                embed.setDescription("Kamu tidak bisa memakai perintah ini!");

                interaction.reply({ embeds: [embed], ephemeral: true })
                return;
            }

            if (interaction.commandName === "help") {
                const commands = client.commands.filter(cmd => cmd.category !== "Pengembang");

                await interaction.respond(
                    commands.map(cmd => ({ name: cmd.data.name, value: cmd.data.name }))
                ).catch(o_O => void 0);
            }
        }
    }
}