const { SlashCommandBuilder } = require('@discordjs/builders');
const Model = require("../../lib/extensions/models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warns")
        .setDescription("Посмотреть список своих предупреждений."),
        
    async execute(client, interaction) {
        let user = await Model.findOrCreate({ uid: interaction.user.id, gid: interaction.member.guild.id }, { uid: interaction.user.id, gid: interaction.member.guild.id });

        interaction.reply({
            embeds: [{
                color: client.config.color,
                description: user.doc.warns.map((x) => `\`${x.caseid})\` <@${x.mod}> - ${x.reason}`).join("\n") || "В данный момент у вас нет предупреждений!",
            }]
        });
    }
};