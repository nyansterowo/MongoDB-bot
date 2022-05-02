const { Intents } = require('discord.js');

module.exports = {
    disableEveryone: true,
    disableMentions: 'everyone',
    fetchAllMembers: false,

    restTimeOffset: 0,
    failIfNotExists: false,
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: false,
    },
    
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    ],
    
    presence: {
        activities: [{ name: "tg: @nyansterowo", type: "PLAYING" }],
        status: "online"
    }
};