module.exports = {
  name: 'bio',
  description: 'Изменить описание.',
  aliases: [],
  public: true,
  async execute(bot, message, args, config) {
    let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
    if(!data) return bot.nodb();

    let context = args.slice(0).join(` `)
    
    if(!context){ data.bio = `\`\`\`<prefix>bio [Текст]\`\`\``; data.save(); message.react("🎉"); return; }

    if(context.length >= 200) return message.reply(`К сожелению я не могу поставить вам такое описание. Оно имеет ${context.length}длинну.`)

    let a = new Discord.MessageEmbed()
    .setTitle(`Вы успешно изменили свою биографию.`)
    .setDescription(context)
    .setColor(config.color)
    message.channel.send(a)
    data.bio = context; data.save();
  }
}
