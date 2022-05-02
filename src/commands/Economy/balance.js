const { SlashCommandBuilder } = require('@discordjs/builders');
const Model = require("../../lib/extensions/models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Посмотреть свой серверный баланс.")
        .addUserOption(option => option.setName('user').setDescription('Укажите пользователя (необязательно).')),
        
    async execute(client, interaction) {
        let mention = interaction.options.getUser('user') || interaction.user;
        let user = await Model.findOrCreate({ uid: mention.id, gid: interaction.member.guild.id }, { uid: mention.id, gid: interaction.member.guild.id });
        
        interaction.reply({
            embeds: [{
                color: client.config.color,
                fields: [
                    { 
                        name: "Экономика:",
                        value: `💸 **Баланс:** \`${user.doc.eco.balance}$\`\n✉️ **Сообщений:** \`${user.doc.eco.messages}\``,
                        inline: true,
                    },
                    {
                        name: "Статус:",
                        value: `🎇 **Опыт:** \`${user.doc.eco.xp}/${100 * user.doc.eco.level}\`\n🎈 **Уровень:** \`${user.doc.eco.level}\`\n📛 **Предупреждений:** \`${user.doc.warns.length}/3\``,
                        inline: true,
                    }
                ],
                description: `\`\`\`${user.doc.eco.biography}\`\`\``,
                thumbnail: {
                    url: mention.displayAvatarURL({ dynamic: true }),
                },
            }]
        });
    }
};