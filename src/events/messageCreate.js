const Model = require("../lib/extensions/models/User");

module.exports = {
	name: 'messageCreate',
	once: true,
	async execute(client, message) {
		if(message.author.bot == true) return;

		const user = await Model.findOrCreate({ uid: message.author.id, gid: message.guildId }, { uid: message.author.id, gid: message.guildId });

		if(user.doc.eco.xp >= 100 * user.doc.eco.level) {
			user.doc.eco.xp -= Number(100 * user.doc.eco.level);
			user.doc.eco.level++;

			user.doc.eco.balance += Math.floor(Math.random() * 100);
			
			message.channel.send({
				embeds: [{
					color: client.config.color,
					description: `🎉 Поздравляю **${message.author.tag}**, теперь у вас \`${user.doc.eco.level}\` уровень.`,
				}]
			})
		} else user.doc.eco.xp++;

		user.doc.eco.messages++;
		user.doc.save();
	},
};