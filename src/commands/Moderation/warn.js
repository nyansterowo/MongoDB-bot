const { SlashCommandBuilder } = require('@discordjs/builders');
const Model = require("../../lib/extensions/models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Выдать предупреждение пользователю.")
        .addUserOption(option => option.setName('user').setDescription('Укажите пользователя.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Укажите причину предупреждения.').setRequired(true)),
        
    async execute(client, interaction) {
        let mention = interaction.options.getUser('user');
        let res = interaction.options.getString('reason');

        if(mention.id == interaction.user.id) return interaction.reply("Зачем давать предупреждение самому себе?");
        let user = await Model.findOrCreate({ uid: mention.id, gid: interaction.member.guild.id }, { uid: mention.id, gid: interaction.member.guild.id });

        user.doc.warns.push({ caseid: user.doc.warns.length, mod: interaction.user.id, reason: res }); user.doc.save();

        if(user.doc.warns.length >= 3) { 
            await interaction.guild.members.ban(interaction.options.getUser('user'))
                .then(interaction.reply("Пользователь получил много жалоб, он был заблокирован на сервере. \`(3/3)\`"))
                .catch(interaction.reply("Пользователь получил много предупреждений, но я не смог его выгнать потому-что, у меня нет прав. \`(3/3)\`"));
        } else await interaction.reply({
            embeds: [{
                color: client.config.color,
                description: `Администратор **${interaction.user.tag}** успешно выдал предупреждение пользователю **${mention.tag}** \`(${user.doc.warns.length}/3)\``,
            }]
        });
    }
};
