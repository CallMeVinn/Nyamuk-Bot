const { readdirSync } = require("node:fs");

exports.load = (client) => {
    readdirSync("./commands")
        .forEach(directory => {
            for (const file of readdirSync(`./commands/${directory}`)) {
                const commands = require(`../commands/${directory}/${file}`);
                commands.aliases = commands.aliases ?? [];
                commands.category = directory;
                commands.cooldown = commands.cooldown ?? 3000;
                client.commands.set(commands.data.name, commands);
            };
        });
};
