module.exports = {
  name: "warn",
  description: "Выдать предупреждение пользователю",
  aliases: [],
  public: true,
  async execute(bot, message, args, config) {

      let reason = args.slice(1).join(` `); if(!reason) reason = 'Отсуствует.'
      let member = message.guild.member(message.mentions.users.first())
      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`К сожелению у вас нету прав "Кик Участников". Я не могу исполнить вашу команду.`)
      if(!member) return message.reply(`Пользователь не найден. Укажите его, упомынув его.`)
      if(member.user.id == message.author.id) return message.reply(`Постойте, одумайтесь!`)
      if(member.user.bot) return message.reply(`Боты не по моей части`)

      let data = await User.findOne({ guildID: message.guild.id, userID: member.id });
      if(!data) return bot.nodb(member.user);

      let embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setDescription(`Модератор: ${message.author.tag}\nНарушитель: ${member.user.tag}\n\nПричина: ${reason}`)
      message.channel.send(embed); data.warn += 1;

      if(data.warn >= config.warn){
        if(member.kickable == false){
          message.reply(`Я не могу кикнуть данного пользователя из за нехватки прав. Предупреждения были обнулены.`); data.warn = 0;
        }else{
          message.guild.member(member).kick(reason).then(x => {
            message.reply(`${member.user.tag} был кикнут за \`${reason}\``)
            data.warn = 0;
          })
        }
      }
    data.save()
  }
};
