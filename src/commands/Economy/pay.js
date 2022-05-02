const { SlashCommandBuilder } = require('@discordjs/builders');
const Model = require("../../lib/extensions/models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pay")
        .setDescription("Передать баланс пользователю.")
        .addNumberOption(option => option.setName('money').setDescription('Укажите количество монет.').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('Укажите пользователя (необязательно).').setRequired(true)),
        
    async execute(client, interaction) {
        let mention = interaction.options.getUser('user');
        let bal = interaction.options.getNumber('money');

        if(mention.id == interaction.user.id) return interaction.reply("Зачем передать баланс самому себе?");

        let user1 = await Model.findOrCreate({ uid: interaction.user.id, gid: interaction.member.guild.id }, { uid: interaction.user.id, gid: interaction.member.guild.id });
        let user2 = await Model.findOrCreate({ uid: mention.id, gid: interaction.member.guild.id }, { uid: mention.id, gid: interaction.member.guild.id });
        
        if(user1.doc.eco.balance < bal) return interaction.reply("У вас нет столько денег!");

        user1.doc.eco.balance -= parseInt(bal); user1.doc.save();
        user2.doc.eco.balance += parseInt(bal); user2.doc.save();
        
        
        interaction.reply({
            embeds: [{
                color: client.config.color,
                description: `Пользователь **${interaction.user.tag}** передал своему другу **${mention.tag}** баланс в размере \`${bal}$\``,
            }]
        });
    }
};