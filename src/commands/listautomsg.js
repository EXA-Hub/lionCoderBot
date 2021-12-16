module.exports = {
    name: 'listautomsg',
    aliases: ['lam'],
    category: 'automsg',
    description: 'الردود تلقائي',
    // expectedArgs: '',
    // minArgs: 0,
    // maxArgs: 0,
    syntaxError: '× حدث خطأ ما ×',
    permissions: ['ADMINISTRATOR'],
    // cooldown: '',
    // globalCooldown: '',
    hidden: false,
    ownerOnly: false,
    testOnly: false,
    guildOnly: true,
    slash: false,
    // options: [],
    init: (client, instance) => {},
    callback: async({
        guild,
        member,
        user,
        message,
        channel,
        args,
        text,
        client,
        prefix,
        instance,
        interaction,
    }) => {
        const db = require("quick.db");
        const { MessageEmbed } = require("discord.js");
        const data = db.all().filter(x => x.ID.startsWith('autoMsg_'));
        const embed = new MessageEmbed().setTitle('جميع الردود التلقائية');
        data.forEach(x => embed.addField(x.ID.replace('autoMsg_', ''), x.data, false));
        channel.send({ embeds: [embed] });
    },
}