const db = require('./db');

db.connection.connect(function(err) {
	if (err) throw err;
	console.log(`Connected as ID ${db.connection.threadId}`);
	db.readProducts();
});
