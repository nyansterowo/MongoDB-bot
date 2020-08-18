/*
config {
  timely - время через которое можно будет получать бонус.
  how - количество монет которое будет даваться в timely.
  upXP - при каком кол-ве опыта будет повышаться уровень.
  prefix - думаю не стоит обьяснять что це.
  owners - Юзера не имеющие никаких ограничений.
  color - Основной цвет бота.
  warn - При скольких кол-во предупреждений юзер будет кикнут.
  
  token - токен бота.
  dataURL - ссылка на базу данных.
}
*/

global.Discord = require('discord.js')
global.mongoose = require('mongoose')
const ms = require('ms')
const config = require('./config.json')
const fs = require('fs')
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
global.Guild = require("./data/guild.js");
global.User = require('./data/user.js');

mongoose.connect(config.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected',()=>{
  console.log('[✅ DataBase] Connected!')
})

fs.readdirSync('./commands').forEach(module => {
    const commandFiles = fs.readdirSync(`./commands/${module}/`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${module}/${file}`);
        command.category = module;
        bot.commands.set(command.name, command);
    }
})

bot.on('ready', () => {
  console.log(`[✅ Bot] ${bot.user.tag} Online!`)
})

bot.on('message', async(message) => {

  if(message.author.bot) return;
  if(message.channel.type == 'dm') return;

  bot.nodb = (user) => message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`К сожелению **${user.tag}** нету в базе-данных.`));

  let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });
  let guild = await Guild.findOne({ guildID: message.guild.id });
  if(!user) { User.create({ guildID: message.guild.id, userID: message.author.id }); message.channel.send(`\`[✅ DataBase]\` **${message.author.username}** Успешно был(а) добавлен в базу-данных`) }
  if(!guild) { Guild.create({ guildID: message.guild.id }); message.channel.send(`\`[✅ DataBase]\` **${message.guild.name}** Успешно была добавлена в базу-данных`); }   
  
  setTimeout(() => { // необходимо для того чтоб бот успевал записать в бд юзера если его нету.

    let random = Math.floor(Math.random() * 5)
    user.money += random;
    user.xp++
    user.messages++

    if(user.xp >= config.upXP){
      let embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setDescription(`[:tada:] Поздравим **${message.author.username}** с новым уровнем!`)
      message.channel.send(embed)
      user.xp -= config.upXP;
      user.level+=1
    }

    user.save();

    if (!message.content.startsWith(guild.prefix)) return;
    const args = message.content.slice(guild.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const command = bot.commands.get(cmdName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
    if(!require('./config.json').owner.includes(message.author.id) && command.public === false) return;
    command.execute(bot, message, args, config);

  }, 5) // если у вас овер слабый инет, то ставьте побольше, ибо бот не успеет сохранить и напишет ошибку.
})

bot.login(config.token)
