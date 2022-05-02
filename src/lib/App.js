const { Client, Collection } = require("discord.js");
const discord = require("./extensions/Discord.js");

const { parse: parseYaml } = require("yaml");
const { readFileSync } = require("fs");

require("require-dir")("./utils", { extensions: [".js"] });

class SampleClient extends Client {
    constructor() {
        super({ ...discord });

        this.commands = new Collection();
        this.config = parseYaml(readFileSync("./src/config.yml", "utf8"));
    }

    start(load) {
        this.login(this.config.token)
            .then(console.log(`[DISCORD] The application has successfully connected to the discord api`))
            .catch(err => console.error(`[DISCORD] Error: ${err.message}`));

        if(load == true) this.preloadall();
    }

    preloadall() {
        EventsLoader(this);
        CommandsLoader(this);
        ConnectMongo(this.config);
    }

    distroy() {
        process.exit();
    }
}

module.exports = SampleClient;