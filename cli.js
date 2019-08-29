const inquirer = require('inquirer');

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
		let itemSelected = res.itemSelected;
		let unitsSelected = res.unitsSelected;
		console.log('Item selected', itemSelected);
		console.log('Units selected:', unitsSelected);
	});
}

module.exports = { welcomeUser };
