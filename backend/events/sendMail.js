const event = require('events');
let evenement = new event.EventEmitter();

evenement.on('sendMail', function (params) {
    console.log(`${params.message} ${params.email}`);
});

module.exports = evenement;
