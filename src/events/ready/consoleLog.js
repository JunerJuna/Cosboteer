const { TextChannel } = require('discord.js');
const { statusChannels, privated } = require('../../../config.json');

module.exports = (client) => {
    console.log(`${client.user.tag} is online`)
};