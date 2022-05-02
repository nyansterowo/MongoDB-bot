const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
        const rest = new REST({ version: "9" }).setToken(client.config.token);

        client.guilds.cache.forEach(async x => { 
            try {
                await rest.put(Routes.applicationGuildCommands(client.user.id, x.id), { body: client.list })
            } catch (err) {
                console.error(`Failed to update the list of slash commands on the server with id — ${x.id} (${err.message})`)
            }
        });

        delete client.list;
	},
};