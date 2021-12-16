module.exports = {
    name: 'removeautomsg',
    aliases: ['ram'],
    category: 'automsg',
    description: 'إزالة رد تلقائي',
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
        channel.send({ content: 'يرجى إرسال أيدي الغرفة' }).then(msg => {
            const filter = m => m.author === user;
            channel.awaitMessages({ filter, max: 1, time: 60 * 000, errors: ['time'] }).then(cIDm => {
                cIDm = cIDm.first();
                const data = db.all().filter(x => x.ID.startsWith(`autoMsg_${cIDm.content}`));
                [msg, cIDm].forEach(x => x.delete());
                if (data.length > 0) {
                    if (data.length > 1) {
                        const content = data.map(x => `**${x.ID} => ${x.data}**`);
                        channel.send({ content: content, allowedMentions: { users: [user] } });
                    } else {
                        const deleted = db.delete(data[0].ID);
                        if (deleted) channel.send({ content: 'تم بنجاح ✅' });
                        else channel.send({ content: '× حدث خطأ ما ×' });
                    }
                } else return channel.send({ content: 'غير موجود' });
            });
        });
    },
}