const fs = require('fs');
const path = require('path');
const { emojis } = require("../../data/jsons/emojis.json");

module.exports = ( dir ) => {

    const fullDir = path.join(__dirname,"../..",dir);
    const file = fs.readFileSync(fullDir,"utf8");
    const json = JSON.parse(file);

    var value = "";
    for(const group in json.stats) {
        if(group == "details") break;
        for(const stat in json.stats[group]) {
            value = value + stat + ": "
            if(stat == "resources") {
                for(const resource in json.stats[group][stat]) {
                    value = value + json.stats[group][stat][resource][0];
                    value = value + emojis[json.stats[group][stat][resource][1]] + " ";
                }
            } else {
                value = value + json.stats[group][stat];
            }
            value = value + "\n";
        }
    }
    value = value + "\n" + json.extra;
    return value;
}