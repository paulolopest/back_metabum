CREATE TABLE metabum_users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL UNIQUE,
    credit_card VARCHAR(255)
);

DROP TABLE metabum_users;

SELECT * FROM metabum_users;

DESCRIBE  metabum_users;

ALTER TABLE metabum_users
DROP COLUMN role;

ALTER TABLE metabum_users
ADD COLUMN role ENUM("Normal", "Administrator") DEFAULT "Normal";

CREATE TABLE metabum_card (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    cvv VARCHAR(255) NOT NULL,
    validation_date VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL
);

DROP TABLE metabum_card;

SELECT * FROM metabum_card;

CREATE TABLE metabum_products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    product_img VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    tags VARCHAR(255) NOT NULL
);

SELECT * FROM metabum_products;


DESCRIBE metabum_products;

DROP TABLE metabum_products;

CREATE TABLE metabum_creditPayment (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    card_number VARCHAR(255) NOT NULL,
    card_name VARCHAR(255) NOT NULL,
    card_validation DATE NOT NULL,
    date DATE NOT NULL
);

DROP TABLE metabum_creditPayment;

SELECT * FROM metabum_creditPayment;

CREATE TABLE metabum_boletoPayment (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    bar_code VARCHAR(255) NOT NULL UNIQUE
);

SELECT * FROM `metabum_boletoPayment`;

DROP TABLE metabum_boletoPayment;
