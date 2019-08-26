const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : 'localhost',
	port     : 3306,
	user     : 'root',
	password : 'root',
	database : 'gBay_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
    connection.end()
    console.log(`Connection Ended`);
    // START MAIN LOOP
});