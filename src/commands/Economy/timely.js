const { SlashCommandBuilder } = require('@discordjs/builders');
const Model = require("../../lib/extensions/models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timely")
        .setDescription("Получить ежедневный бонус"),
        
    async execute(client, interaction) {
        let user = await Model.findOrCreate({ uid: interaction.user.id, gid: interaction.member.guild.id }, { uid: interaction.user.id, gid: interaction.member.guild.id });

        let money = Math.floor(Math.random() * 5000)
        if(Date.now() < user.doc.eco.timelytime) return interaction.reply("Вы недавно забрали свой бонус, приходите чуть позже.");
        user.doc.eco.balance += parseInt(money); user.doc.eco.timelytime = Date.now() + 8.64e+7; user.doc.save()
        
        interaction.reply({
            embeds: [{
                color: client.config.color,
                description: `На ваш баланс успешно было добавлено \`${money}$\`.`,
            }]
        });
    }
};