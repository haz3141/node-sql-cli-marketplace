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

managerMsg = [
	{
		type    : 'list',
		message : 'What would you like to do?',
		choices : [ 'View products for sale.', 'View low inventory.', 'Add to inventory.', 'Add new product.' ],
		name    : 'optionSelected'
	}
];

addItemMsg = [
	{
		type    : 'input',
		message : 'What is the ID of the item you would like to add?',
		name    : 'id'
	},
	{
		type    : 'input',
		message : 'What is the name of the item?',
		name    : 'name'
	},
	{
		type    : 'input',
		message : 'What is the name of the department for the item?',
		name    : 'department'
	},
	{
		type    : 'input',
		message : 'What is the price (in cents) of the item?',
		name    : 'price'
	},
	{
		type    : 'input',
		message : 'How many of the item are in stock?',
		name    : 'stock'
	}
];

addStockMsg = [
	{
		type    : 'input',
		message : 'What is the ID of the item you would like to update?',
		name    : 'id'
	},
	{
		type    : 'input',
		message : 'How many units of this item would you like to add?',
		name    : 'numUnits'
	}
];

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

function managerDisplay() {
	console.log(`Marketplace Inventory`);
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		store = res;
		console.table(store);
		connection.end();
		console.log(`Connection Ended`);
	});
}

function addStock() {
	console.log(`Marketplace Inventory`);
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		store = res;
		console.table(store);
		inquirer.prompt(addStockMsg).then(function(res) {
			connection.query(
				'UPDATE products SET ? WHERE ?',
				[
					{
						stock_quantity : (store[res.id - 1].stock_quantity += parseInt(res.numUnits))
					},
					{
						item_id : res.id
					}
				],
				function(err) {
					if (err) throw err;
					console.log('Inventory Updated!');
					managerDisplay();
				}
			);
		});
	});
}

function displayLowInventory() {
	connection.query('SELECT * FROM products WHERE stock_quantity<=5', function(err, res) {
		if (err) throw err;
		console.log(`Low Inventory Items`);
		console.table(res);
		connection.end();
		console.log(`Connection Ended`);
	});
}

function addItem() {
	inquirer.prompt(addItemMsg).then(function(res) {
		connection.query(
			'INSERT INTO products SET ?',
			{
				item_id         : res.id,
				item_name       : res.name,
				department_name : res.department,
				price           : res.price,
				stock_quantity  : res.stock
			},
			function(err, res) {
				if (err) throw err;
				console.log('Your item was added to the inventory.');
				managerDisplay();
			}
		);
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

function welcomeUser() {
	inquirer.prompt(welcomeMsg).then(function(res) {
		order = [];
		itemSelected = res.itemSelected;
		// console.log(itemSelected);
		order.push(itemSelected);
		// console.table(order);
		unitsSelected = res.unitsSelected;
		order.push(unitsSelected);
		// console.log(unitsSelected);
		// console.table(order);
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

function welcomeManager() {
	inquirer.prompt(managerMsg).then(function(res) {
		switch (res.optionSelected) {
			case 'View products for sale.':
				managerDisplay();
				break;

			case 'View low inventory.':
				displayLowInventory();
				break;

			case 'Add to inventory.':
				addStock();
				break;

			case 'Add new product.':
				addItem();
				break;

			default:
				break;
		}
	});
}

module.exports = { connection, readProducts, welcomeManager };
