require("dotenv").config();

const WOKCommands = require('wokcommands');
const config = require('./data/config');
const Discord = require('discord.js');
const path = require('path');

const { Intents } = Discord;

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

client.on('ready', () => {
    const dbOptions = {
        keepAlive: true
    };
    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'events'),
        testServers: [],
        botOwners: ['635933198035058700', '721355948135809148'],
        owners: ['635933198035058700', '721355948135809148'],
        typeScript: false,
        ignoreBots: false,
        ephemeral: true,
        showWarns: true,
        mongoUri: process.env.MONGOURI,
        debug: false,
        dbOptions,
    }).setCategorySettings(
        require(path.join(__dirname, 'data/CategorySettings.json'))
    ).setDisplayName(
        client.user.username
    ).setDefaultPrefix(
        config.prefix
    );
});

client.login(config.token);