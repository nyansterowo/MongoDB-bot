module.exports = {
  name: 'add-money',
  description: 'Добавить монетки юзеру',
  aliases: ["add"],
  public: true,
  async execute(bot, message, args, config) {
    let member = message.guild.member(message.mentions.users.first() || message.author)
    let data = await User.findOne({ guildID: message.guild.id, userID: member.user.id });

    if(!data) return bot.nodb(member.user);

    if(!args[0]) return message.reply(`Укажите кол-во монет которое хотите передать`);
    if(isNaN(args[0])) return message.reply(`Это не является числом.`);
    if(member.user.bot) return message.reply(`Боты не люди.`);
    
    let a = new Discord.MessageEmbed()
    .setDescription(`Вы успешно добавили **${member.user.username}** копейки в количестве \`${args[0]}\``)
    .setColor(config.color)
    message.channel.send(a)
    data.money += Math.floor(parseInt(args[0])); data.save();
  }
}
