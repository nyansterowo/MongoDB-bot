module.exports = {
    name: "help",
    description: "Команда позволяющая узнать описание других, не круто ли?",
    aliases: ["h"],
    public: true,
    async execute(bot, message, args) {
        function list(cat, cname) {
            return `**${cname}**: ${bot.commands.filter(cmd => cmd.category == cat).map(cmd => `\`${cmd.name}\``).join(", ")}`;
        }
      let embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setDescription(`${list("economy", "Economy")}\n${list("guild", "Guild")}`)
      .setFooter(`Всего комманд: ${bot.commands.size} | github.com/perssBest`)
      .addField(`Разработчики:`,`${config.owner.map(x => bot.users.cache.get(x).tag).join('\n')}`)
        message.channel.send(embed)
    }
};
