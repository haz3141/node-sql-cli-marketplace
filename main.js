const connection = require('./db');

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
    connection.end()
    console.log(`Connection Ended`);
    // START MAIN LOOP
});