const { Collection, REST, Routes } = require("discord.js");
const { readdirSync } = require("node:fs");

const { ClientId, GuildId, Token } = process.env;
const argv = process.argv.slice(2);

const _commands = new Collection();

(async() => {
    if (argv[0] === "global") {
        await registerGlobal();
    }
    if (argv[0] === "guild") {
        await registerGuild();
    }
})();

async function registerGlobal(regist = true) {
    console.log('[ApplicationCommand]', "Start refreshing 'GLOBAL' application (/) commands.");
    readdirSync("./commands")
        .filter(entry => entry !== "Pengembang")
        .forEach(directory => {
            for (const file of readdirSync(`./commands/${directory}`)) {
                const { data } = require(`./commands/${directory}/${file}`);
                _commands.set(data.name, data.toJSON());
            };
        });
    console.log('[ApplicationCommand]', `Stored total ${_commands.size} commands.`);

    let commands = _commands.map(data => data);
    const rest = new REST({ version: 10 }).setToken(Token);

    if (argv[1] && argv[1] === "clear" || regist === false) commands = commands.slice(commands.length);

    try {
        const data = await rest.put(
            Routes.applicationCommands(ClientId),
            { body: commands }
        );
        console.log('[ApplicationCommand]', `Successfully reloaded ${data.length} 'GLOBAL' application (/) commands.`);
    } catch(error) {
        console.error(error);
    }
    _commands.clear();
    return commands;
}

async function registerGuild(guildId, regist = true) {
    console.log('[ApplicationCommand]', `Start refreshing 'GUILD: ${guildId || GuildId}' application (/) commands.`);
    readdirSync("./commands")
        .forEach(directory => {
            for (const file of readdirSync(`./commands/${directory}`)) {
                const { data } = require(`./commands/${directory}/${file}`);
                _commands.set(data.name, data.toJSON());
            };
        });
    console.log('[ApplicationCommand]', `Stored total ${_commands.size} commands.`);

    let commands = _commands.map(data => data);
    const rest = new REST({ version: 10 }).setToken(Token);

    if (argv[1] && argv[1] === "clear", regist === false || guildId === false) {
        guildId = undefined;
        commands = commands.slice(commands.length);
    }
    else if (argv[2] === "clear") {
        guildId = argv[1];
        commands = commands.slice(commands.length);
    }

    try {
        const data = await rest.put(
            Routes.applicationGuildCommands(ClientId, guildId || GuildId),
            { body: commands }
        );
        console.log('[ApplicationCommand]', `Successfully reloaded ${data.length} 'GUILD: ${guildId || GuildId}' application (/) commands.`);
    } catch(error) {
        console.error(error);
    }
    _commands.clear();
    return commands;
}

module.exports = { registerGlobal, registerGuild }