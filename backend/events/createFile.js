const event = require('events');
const fs = require('fs');
let evenement = new event.EventEmitter();

evenement.on('createFile', function (params) {
    fs.appendFile(`files/${params.file}.txt`, params.message, error => {
        if (error) return console.log(error);
    })
});

module.exports = evenement;
