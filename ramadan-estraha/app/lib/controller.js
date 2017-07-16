/*
    controller use to refresh the file without restart
*/

const fs        = require('fs');

const dirReader = require('./file-dir.js');

function init (target, fn) {

    let filesFrom = dirReader.dirReaderSync(target, fn);
    fs.writeFileSync('./app/data/files.json', JSON.stringify(filesFrom));
    
    let body = fs.readFileSync('./app/data/files.json', 'utf8');

    return JSON.parse(body);

}

function updateConfig (con) {

    //object to string JSON

    let obStrJs = JSON.stringify(con);

    fs.writeFileSync('./app/data/config.json', obStrJs);

    let body = fs.readFileSync('./app/data/config.json', 'utf8');

    return JSON.parse(body);

}

module.exports = {
    init: init,
    updateConfig: updateConfig
};