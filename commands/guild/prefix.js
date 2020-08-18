module.exports = {
    name: 'prefix',
    description: 'Сменить префикс боту.',
    aliases: ["set-prefix"],
    public: true,
    async execute(bot, message, args, config) {
        if(!args[0]) return message.reply(`Укажите желаемый префикс`)
        if(args[0].length > 5) return message.reply(`Я не могу поставить префикс в длинную больше чем 5 символов`)

        let data = await Guild.findOne({ guildID: message.guild.id })

        let embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(`Вы успешно сменили префикс бота на \`${args[0]}\``)
        message.channel.send(embed)

        data.prefix = args[0]; data.save();
    }
  }
