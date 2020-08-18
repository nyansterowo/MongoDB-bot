module.exports = {
  name: "unwarn",
  description: "Снятие предупреждения с пользователя.",
  aliases: [],
  public: true,
  async execute(bot, message, args, config) {

      let member = message.guild.member(message.mentions.users.first())
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`К сожелению у вас нету прав "Кик Участников". Я не могу исполнить вашу команду.`)
      if(!member) return message.reply(`Пользователь не найден. Укажите его, упомянув его.`)
      if(member.user.id == message.author.id) return message.reply(`Постойте, одумайтесь!`)
      if(member.user.bot) return message.reply(`Боты не по моей части`)

      let data = await User.findOne({ guildID: message.guild.id, userID: member.id })
      if(!data) return bot.nodb(member.user);

      if(data.warn <= 0) return message.reply(`У данного пользователя и так 0 предупреждений, куда меньше?`);
  

      let embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setDescription(`Модератор: ${message.author.tag}\nНарушитель: ${member.user.tag}\n\nПпредупреждений: ${data.warn}/${config.warn}`)
      message.channel.send(embed)
      data.warn -= 1; data.save();
  }
};
