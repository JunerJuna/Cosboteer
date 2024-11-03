const { TextChannel, ApplicationCommandOptionType } = require('discord.js');
const { statusChannels } = require('../../../config.json');

module.exports = {
    name: 'status',
    description: 'sends a message to all status channels',
    devOnly: true,
    testOnly: true,
    options: [
        {
            name: 'message',
            description: 'what to send',
            required: true,
            type: ApplicationCommandOptionType.String,
        }
    ],

    callback: (client, interaction) => {
        const status = interaction.options.get('message').value;
        interaction.reply('status sent');
        for(const statusChannel of statusChannels) {
             const messageChannel = client.channels.cache.get(statusChannel);
             messageChannel.send(`${status}`);
        }
    }
}