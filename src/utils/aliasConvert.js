const Allaliases = require('../../data/jsons/aliases.json')

module.exports = ( inStr , type ) => {
    const Str = inStr.toLowerCase();
    const aliases = Allaliases[type];
    
    for(const alias of aliases) if(alias.includes(Str)) return alias[0];
    return "ERR";
}