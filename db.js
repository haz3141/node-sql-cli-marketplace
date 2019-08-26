const mysql = require('mysql');

const connection = mysql.createConnection({
	host     : 'localhost',
	port     : 3306,
	user     : 'root',
	password : 'root',
	database : 'gBay_db'
});

function readProducts() {
    console.log(`Marketplace Selection`);
    connection.query(
        'SELECT * FROM products',
        function(err, res) {
            if (err) throw err;
            console.log(res);
            console.log(JSON.stringify(res, null, 4));
            connection.end();
            console.log(`Connection Ended`);
        }
    );
}

module.exports = { connection, readProducts };