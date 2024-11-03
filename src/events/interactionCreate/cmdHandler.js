const { devs, testServer, privated } = require('../../../config.json');
const getLocalCmds = require('../../utils/getLocalCmds');

module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;
    const localCommands = getLocalCmds();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );
        
        if(privated) if(!devs.includes(interaction.member.id) || !(interaction.guild.id === testServer)) return;

        if(!commandObject) return;
        if(commandObject.devOnly) {
            if(!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'this command is dev-only',
                    ephemeral: true,
                });
                return;
            }
        }
        if(commandObject.testOnly) {
            if(!(interaction.guild.id === testServer)) {
                interaction.reply({
                    content: 'this command can not be ran here',
                    ephemeral: true,
                });
                return;
            }
        }

        if(commandObject.permissionsRequired?.length) {
            for(const permission of commandObject.permissionsRequired) {
                if(!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'not enough permissions',
                        ephemeral: true,
                    });
                    break;
                }
            }
        }
        if(commandObject.botPermissions?.length) {
            const bot = interaction.guild.members.me;
            for(const permission of commandObject.botPermissions) {
                if(!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: 'I am lacking permissions',
                        ephemeral: true,
                    })
                    break;
                }
            }
        }

        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`error running command ${error}`);
    }
};