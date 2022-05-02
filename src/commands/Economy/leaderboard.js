const { SlashCommandBuilder } = require('@discordjs/builders');
const Model = require("../../lib/extensions/models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Посмотреть лидеров по балансу."),
        
    async execute(client, interaction) {

        let db = await Model.find();
        
        interaction.reply({
            embeds: [{
                color: client.config.color,
                description: db.splice(0, 10).filter(a => a.eco.balance > 0)
                    .map((b, i) => `\`${i++})\` ${client.users.cache.get(b.uid)?.tag || "Unknown#0000"} - **${b.eco.balance}$**`).join("\n"),
            }]
        });
    }
};