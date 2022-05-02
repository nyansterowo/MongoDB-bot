const { Schema, model } = require('mongoose');
const findorcreate = require('mongoose-findorcreate');

const User = Schema({
    uid: { type: String, default: null },
    gid: { type: String, default: null },

    eco: {
        balance: { type: Number, default: 0 },
        xp: { type: Number, default: 0 },
        level: { type: Number, default: 1 },

        timelytime: { type: Number, default: 0 },

        messages: { type: Number, default: 0 },
        biography: { type: String, default: ">_<" },
    },

    warns: { type: Array, default: [] }
});

User.plugin(findorcreate);
module.exports = model("User", User)