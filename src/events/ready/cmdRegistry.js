const areCmdsDifferent = require('../../utils/areCmdsDifferent');
const getAppCmds = require('../../utils/getAppCmds');
const getLocalCmds = require('../../utils/getLocalCmds');

module.exports = async (client) => {
    const localCommands = getLocalCmds();
    
    try {
        const localCommands = getLocalCmds();
        const applicationCommands = await getAppCmds(client);

        for(const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            )
            if(existingCommand) {
                if(localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`deleted ${name}`);
                    continue;
                }
                if(areCmdsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    })
                    console.log(`edited ${name}`);
                }
            } else {
                if(localCommand.deleted) {
                    console.log(`skipping ${name}, set to delete`);
                    continue;
                }
                await applicationCommands.create({
                    name,
                    description,
                    options
                })
                console.log(`registered ${name}`);
            }
        }
    } catch (error) {
        console.log(`error ${error}`);
    }
}