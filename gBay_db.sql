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

INSERT INTO products (
    item_id,
    item_name,
    department_name,
    price,
    stock_quantity
) VALUES
    (1, 'Red Apple', 'Produce', 50, 999),
    (2, 'Green Apple', 'Produce', 50, 999),
    (3, 'Blue Apple', 'Produce', 50, 999),
    (4, 'Yellow Apple', 'Produce', 50, 999),
    (5, 'Violet Apple', 'Produce', 50, 999),
    (6, 'Brown Apple', 'Produce', 50, 999),
    (7, 'Orange Apple', 'Produce', 50, 999),
    (8, 'Pink Apple', 'Produce', 50, 999),
    (9, 'Big Apple', 'Produce', 50, 999),
    (10, 'Tiny Apple', 'Produce', 50, 999)