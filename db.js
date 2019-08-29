const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host     : 'localhost',
	port     : 3306,
	user     : 'root',
	password : 'root',
	database : 'gBay_db'
});

let store;
let order = [];
let itemName;
let numInStock;
let numRequested;
let itemSelected;
let unitsSelected;
let purchased = 0;

function readProducts() {
	console.log(`Marketplace Selection`);
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		store = res;
		console.table(store);
		if (!purchased) {
			welcomeUser();
		} else {
			connection.end();
			console.log(`Connection Ended`);
		}
		// console.log(JSON.stringify(res, null, 4));
	});
}

function calculateOrder(order) {
	if (!store[order[0] - 1]) {
		order = [];
		console.log('Cannot complete your order. Please try again.');
		readProducts();
	} else {
		itemName = store[order[0] - 1].item_name;
		numInStock = store[order[0] - 1].stock_quantity;
		numRequested = order[1];
		console.log('Item Name:', itemName);
		console.log('In Stock:', numInStock);
		console.log('Units Requested:', numRequested);

		if (itemName) {
			if (numRequested <= numInStock) {
				let cost = parseFloat(numRequested * store[order[0] - 1].price / 100).toFixed(2);
				console.log(`Total cost for ${numRequested} ${itemName}s: $${cost}`);
				updateProducts();
			} else {
				console.log('Cannot complete your order. Please try again.');
				readProducts();
			}
		} else {
			console.log('Cannot complete your order. Please try again.');
			readProducts();
		}
	}
}

welcomeMsg = [
	{
		type    : 'input',
		message : "What is the ID of the item you'd like to buy?",
		name    : 'itemSelected'
	},
	{
		type    : 'input',
		message : 'How many units of that item would you like?',
		name    : 'unitsSelected'
	}
];

function welcomeUser() {
	inquirer.prompt(welcomeMsg).then(function(res) {
		order = [];
		itemSelected = order.push(res.itemSelected);
		unitsSelected = order.push(res.unitsSelected);
		console.log('Item selected:', itemSelected);
		console.log('Units selected:', unitsSelected);
		calculateOrder(order);
	});
}

function updateProducts() {
	const query = connection.query(
		'UPDATE products SET ? WHERE ?',
		[
			{
				stock_quantity : (numInStock -= numRequested)
			},
			{
				item_id : itemSelected
			}
		],
		function(err, res) {
            purchased++;
			if (err) throw err;
			// console.log(res.affectedRows + ' products updated!');
			// console.log(query.sql);
			readProducts();
		}
	);
}

module.exports = { connection, readProducts };
