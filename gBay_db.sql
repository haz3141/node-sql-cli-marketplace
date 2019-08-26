DROP DATABASE IF EXISTS gBay_db;

CREATE DATABASE gBay_db;

USE gBay_db;

CREATE TABLE products (
    item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255),
    price INTEGER(11) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);