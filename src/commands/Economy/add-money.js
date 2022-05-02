const { SlashCommandBuilder } = require('@discordjs/builders');
const Model = require("../../lib/extensions/models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-money")
        .setDescription("Выдать баланс пользователю (либо себе).")
        .addNumberOption(option => option.setName('money').setDescription('Укажите количество монет.').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('Укажите пользователя (необязательно).')),
        
    async execute(client, interaction) {
        let mention = interaction.options.getUser('user') || interaction.user;
        let bal = interaction.options.getNumber('money');
        let user = await Model.findOrCreate({ uid: mention.id, gid: interaction.member.guild.id }, { uid: mention.id, gid: interaction.member.guild.id });

        if(bal <= 0) return interaction.reply("Укажите число больше нуля.");
        
        user.doc.eco.balance += parseInt(bal); user.doc.save();
        
        interaction.reply({
            embeds: [{
                color: client.config.color,
                description: `Пользователю **${mention.tag}** было добавлено на баланс \`${bal}$\``,
            }]
        });
    }
};