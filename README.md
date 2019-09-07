# node-sql-cli-marketplace
An Amazon-like CLI marketplace built using Node and MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, the program will track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

## Problem & Solution

The goal here is to create a CLI application that takes in a command and a query. The command tells the app what kind of item and how many of that item the user would like to purchase.

## Preview

![Preview](https://raw.githubusercontent.com/haz3141/node-sql-cli-marketplace/master/assets/screenshot01.PNG)

![Preview](https://raw.githubusercontent.com/haz3141/node-sql-cli-marketplace/master/assets/screenshot02.PNG)

## Getting Started

Simply clone the repository, run npm install, provide your own SQL server, run the schema and seeds queries located in the .sql files, and finally run main.js:

* `Enter item by ID`

* `Enter number of units desired`

* `Cost calculated`

* `Database updated`

Running manager.js will enable the manager view with multiple backend options like viewing low inventory.

### Prerequisites

What things you need to install the software and how to install them

```
Node.js
Node Package Manager
SQL Server
```

#### Installing

```
npm install
provide SQL server at port 3000
terminal input
```

## Built With

* [MySQL](https://www.npmjs.com/package/mysql)
   
* [Inquirer](https://www.npmjs.com/package/inquirer)
   

## Author

* **Haz** - *Project Head* - [haz3141](https://github.com/haz3141)

## Acknowledgments

* Hat tip to Node.JS
* Command Line Interfaces
* SQL Databases
