const { readdirSync } = require("node:fs");

exports.load = (client) => {
    readdirSync("./events")
        .forEach(file => {
            const events = require(`../events/${file}`);
            if (events.once) {
                client.once(events.name, events.execute.bind(null, client));
            } else {
                client.on(events.name, events.execute.bind(null, client));
            }
        });
}