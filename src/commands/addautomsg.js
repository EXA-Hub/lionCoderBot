module.exports = {
    name: 'addautomsg',
    aliases: ['aam'],
    category: 'automsg',
    description: 'إضافة رد تلقائي',
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
                const targetedChannel = guild.channels.cache.get(cIDm.content) || cIDm.mentions.channels.first();
                if (targetedChannel) {
                    channel.send({ content: 'يرجي تحديد الرد' }).then(msg2 => {
                        channel.awaitMessages({ filter, max: 1, time: 60 * 000, errors: ['time'] }).then(cm => {
                            cm = cm.first();
                            const content = cm.content;
                            if (content) {
                                db.set(`autoMsg_${targetedChannel.id}`, `${content}`);
                                [msg, msg2, cIDm, cm].forEach(x => x.delete());
                                channel.send({ content: `تم بنجاح ✅` });
                            } else return channel.send({ content: `لا يمكنني تحديد الرد` });
                        });
                    });
                } else return channel.send({ content: `لا يمكنني العثور على القناة` });
            });
        });
    },
}