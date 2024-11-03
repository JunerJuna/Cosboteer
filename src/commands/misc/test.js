const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'create an embed',

    callback: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle('title')
            .setDescription('description <:uranium:1294283202935914608>')
            .setColor([255,0,255])
            .addFields(
                [{
                    name: 'field title',
                    value: 'field value'
                },
                { 
                    name: 'inline field',
                    value: 'inline value',
                    inline:true
                }]
            )
            .addFields(
                {
                    name: 'inline field 2',
                    value: 'inline value 2',
                    inline: true
                }
            )
;        
        interaction.reply({ embeds: [embed] });
    }
}