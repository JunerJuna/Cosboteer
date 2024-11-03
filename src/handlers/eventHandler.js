const path = require('path');
const getFiles = require("../utils/getFiles")

module.exports = (client) => {
    const eventFolders = getFiles(path.join(__dirname, '..', 'events'), true);
    
    for(const eventFolder of eventFolders) {
        const eventFiles = getFiles(eventFolder);
        
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();
        
        client.on(eventName, async (arg) => {
            for(const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
            }
        })
    }
}