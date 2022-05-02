module.exports = {
	name: "interactionCreate",
    once: false,
	async execute(client, interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
    
        try {
            await command.execute(client, interaction);
        } catch (error) {
            await interaction.reply({ content: `Произошла ошибка во время выполнения команды.\n\`\`\`${error}\`\`\``, ephemeral: true });
        }
	},
};