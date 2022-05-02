const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

EventsLoader = async(client) => {
    const eventFiles = await readdir("src/events");

    for (const file of eventFiles) {
        if (!file.endsWith(".js")) return;

        const event = require(`../../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }
    }
}

module.exports = EventsLoader;