const { EmbedBuilder } = require('discord.js');
const statToText = require('./statToText.js');
const fs = require('fs');
const path = require('path');

module.exports = ( dir ) => {

    const fullDir = path.join(__dirname,"../..",dir);
    const file = fs.readFileSync(fullDir,"utf8");
    const json = JSON.parse(file);
    
    const embed = new EmbedBuilder()
        .setTitle(json.title)
        .setDescription(json.description)
        .setColor(json.color);
    
    for(const field in json.fields) {
        if(json.fields[field].value != "PARSE") {
            embed.addFields({
                name: json.fields[field].name,
                value: json.fields[field].value,
                inline: json.fields[field].inline
            })
        } else {
            embed.addFields({
                name: json.fields[field].name,
                value: statToText(json.fields[field].PATH),
                inline: json.fields[field].inline
            })
        }
    }
    
    if(json.hasThumbnail) embed.setThumbnail(json.thumbnail);
    if(json.hasImage) embed.setImage(json.image);
    
    return embed;
}