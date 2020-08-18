module.exports = {
  name: 'ping',
  description: 'Просмотреть информацию о задержки бота',
  aliases: [],
  public: true,
  async execute(bot, message, args, config) {
    let a = new Discord.MessageEmbed()
    .setDescription(`Сердцебиение клиента: ${Date.now() - message.createdTimestamp}мс\nОтвет api Discord: ${bot.ws.ping | 0 }мс`)
    .setColor('GREEN')
    message.channel.send(a)
  }
}
