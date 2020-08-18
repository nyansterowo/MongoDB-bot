const ms = require('ms');

module.exports = {
    name: 'timely',
    description: 'Ежедневный бонус?',
    aliases: ["bonus"],
    public: true,
    async execute(bot, message, args, config) {

      let data = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
      
      if(data._time !== null && config.timely - (Date.now() - data._time) > 0) return message.reply(`Вы уже взяли свой бонус. Приходите через ${ms(config.timely - (Date.now() - data._time))}`)
      
      let a = new Discord.MessageEmbed()
      .setDescription(`Вы забрали ваш сегодняшний бонус. Вам было выдано \`${config.how}\`копеек`)
      .setColor(config.color)
      message.channel.send(a);
      data._time = Date.now(); data.money += parseInt(config.how); data.save() 
  }
}
