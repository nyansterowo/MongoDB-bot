const { SlashCommandBuilder } = require('@discordjs/builders');
const Model = require("../../lib/extensions/models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unwarn")
        .setDescription("Выдать предупреждение пользователю.")
        .addUserOption(option => option.setName('user').setDescription('Укажите пользователя.').setRequired(true))
        .addNumberOption(option => option.setName('case-id').setDescription('Укажите айди предупреждения.').setRequired(true)),
        
    async execute(client, interaction) {
        let mention = interaction.options.getUser('user');
        let caseid = interaction.options.getNumber('case-id');

        let user = await Model.findOrCreate({ uid: mention.id, gid: interaction.member.guild.id }, { uid: mention.id, gid: interaction.member.guild.id });
        let inarray = user.doc.warns.find(x => x.caseid == caseid);

        if(!inarray) return interaction.reply("Предупреждения под данный айди нет.");
        user.doc.warns.splice(user.doc.warns.indexOf(inarray), 1); user.doc.save();
        
        interaction.reply({
            embeds: [{
                color: client.config.color,
                description: `Администратор **${interaction.user.tag}** успешно снял предупреждение у пользователя **${mention.tag}** \`(${user.doc.warns.length}/3)\``,
            }]
        });
    }
};