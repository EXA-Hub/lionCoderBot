const { Client } = require('discord.js');

/**
 * @param {Client} client
 */

module.exports = (client, instance) => {
    client.on("messageCreate", message => {
        if (message.author.bot) return;
        const db = require("quick.db");
        const data = db.all().filter(x => x.ID.startsWith(`autoMsg_${message.channel.id}`));
        if (data.length === 1) message.reply({ content: data[0].data });
        else return;
    });
}

module.exports.config = {
    displayName: 'Messages',
    dbName: 'MESSAGES' // This should NEVER be changed once set, and users cannot see it.
}