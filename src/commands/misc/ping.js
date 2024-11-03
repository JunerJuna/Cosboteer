module.exports = {
    name: 'ping',
    description: 'pong!',
    // devOnly: boolean,
    // testOnly: boolean,
    // options: object[],
    // deleted: boolean,

    callback: (client, interaction) => {
        interaction.reply(`pong! ${client.ws.ping}ms`);
    }
}