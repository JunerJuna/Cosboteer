const aliasConvert = require("../../utils/aliasConvert.js");
const embedJSON = require("../../utils/embedJSON.js");
const jsonMap = require("../../../data/jsons/mapping.json");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'parts',
    description: 'get the information about a part',
    
    options: [
        {
            name: 'part',
            description: 'the part you want information about',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],

    callback: (client, interaction) => {
        const part = aliasConvert(interaction.options.get('part').value, "parts");
        if(part == "ERR") interaction.reply({ content: "invalid name!" , ephemeral : true });
        else {
            const targetJson = jsonMap[part];
            const embed = embedJSON(targetJson);
            interaction.reply({ embeds: [embed] });
        }
    }
}