const { SlashCommandBuilder } = require('@discordjs/builders');
const Model = require("../../lib/extensions/models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("biography")
        .setDescription("Изменить свою биографию в профиле.")
        .addStringOption(option => option.setName('bio').setDescription('Укажите новую биографию.').setRequired(true)),
        
    async execute(client, interaction) {
        await Model.findOneAndUpdate({ uid: interaction.user.id, gid: interaction.member.guild.id }, { '$set': { "eco.biography": interaction.options.getString('bio') } }).catch(err => {});

        interaction.reply({
            embeds: [{
                color: client.config.color,
                description: `Биография была успешно обновлена!`,
            }]
        });
    }
};