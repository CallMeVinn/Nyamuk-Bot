const { readdirSync } = require("node:fs");

exports.load = (client) => {
    readdirSync("./commands")
        .forEach(directory => {
            for (const file of readdirSync(`./commands/${directory}`)) {
                const commands = require(`../commands/${directory}/${file}`);
                commands.category = directory;
                commandInterface(commands);
                client.commands.set(commands.data.name, commands);
            };
        });
};

function commandInterface(commands) {
    commands.aliases = commands.aliases ?? [];
    commands.cooldown = commands.cooldown ?? 3000;
    return commands;
}