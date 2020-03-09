module.exports = {
  name: "warn",
  description: "Выдать предупреждение пользователю",
  aliases: [],
  public: true,
  async execute(bot, message, args) {
      let reason = args.slice(1).join(` `); if(!reason) reason = 'Отсуствует.'
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
          data.warn += 1
          data.save()
          let embed = new Discord.MessageEmbed()
          .setColor(config.color)
          .setDescription(`Модератор: ${message.author.tag}\nНарушитель: ${member.user.tag}\n\nПричина: ${reason}`)
          message.channel.send(embed)
          if(data.warn >= config.warn){
            if(member.kickable == false){
              message.reply(`Я не могу кикнуть данного пользователя из за нехватки прав. Предупреждения были обнулены.`)
              data.warn = 0;
              data.save()
            }else{
              message.guild.member(member).kick(reason)
              message.reply(`${member.user.tag} был кикнут за \`${reason}\``)
              data.warn = 0;
              data.save();
            }
          }
      })
  }
};
