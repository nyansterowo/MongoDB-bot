module.exports = {
  name: "unwarn",
  description: "Снятие предупреждения с пользователя.",
  aliases: [],
  public: true,
  async execute(bot, message, args) {
      let member = message.guild.member(message.mentions.users.first())
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`К сожелению у вас нету прав "Кик Участников". Я не могу исполнить вашу команду.`)
      if(!member) return message.reply(`Пользователь не найден. Укажите его, упомынув его.`)
      if(member.user.id == message.author.id) return message.reply(`Постойте, одумайтесь!`)
      if(member.user.bot) return message.reply(`Боты не по моей части`)
      User.findOne({guildID: message.guild.id, userID: member.id}, (err,data) => {
        if(!data){
          let errorMess = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription(`К сожелению **${member.user.tag}** нету в базе-данных. Соотвественно он не мог ничего нарушить.`)
          return message.channel.send(errorMess)
        }
          if(data.warn <= 0){
            return message.reply(`У данного пользователя и так 0 предупреждений, куда меньше?`)
          }
          data.warn -= 1
          data.save()
          let embed = new Discord.MessageEmbed()
          .setColor(config.color)
          .setDescription(`Модератор: ${message.author.tag}\nНарушитель: ${member.user.tag}\n\nПпредупреждений: ${data.warn}/${config.warn}`)
          message.channel.send(embed)
      })
  }
};
