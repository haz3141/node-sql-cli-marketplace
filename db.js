const mysql = require('mysql');
const cli = require('./cli');

const connection = mysql.createConnection({
	host     : 'localhost',
	port     : 3306,
	user     : 'root',
	password : 'root',
	database : 'gBay_db'
});

function readProducts() {
	console.log(`Marketplace Selection`);
	connection.query('SELECT * FROM products', function(err, res) {
        if (err) throw err;
        console.log(res);
		console.table(res);
		cli.welcomeUser();
		db.connection.end();
		console.log(`Connection Ended`);
		// console.log(JSON.stringify(res, null, 4));
	});
}

module.exports = { connection, readProducts };
