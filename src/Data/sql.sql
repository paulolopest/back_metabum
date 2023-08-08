CREATE TABLE
    metabum_users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        cpf VARCHAR(255) NOT NULL UNIQUE,
        credit_card VARCHAR(255)
    );

DROP TABLE metabum_users;

SELECT * FROM metabum_users;

DESCRIBE metabum_users;

ALTER TABLE metabum_users DROP COLUMN role;

ALTER TABLE metabum_users
ADD
    COLUMN default_address BIGINT DEFAULT 0;

-- Products-- Products-- Products-- Products-- Products-- Products-- Products-- Products

CREATE TABLE
    metabum_products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        src VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        quantity INT NOT NULL,
        tags VARCHAR(255) NOT NULL
    );

ALTER TABLE metabum_products DROP COLUMN category ;

SELECT * from metabum_products WHERE tags LIKE "%s20%";

DROP TABLE metabum_products;

SELECT * FROM metabum_products;

DESCRIBE metabum_products;

CREATE TABLE
    metabum_products_description (
        id VARCHAR(255) PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        img VARCHAR(255)
    );

DROP TABLE metabum_products_description;

SELECT * FROM metabum_products_description;

DESCRIBE metabum_products_description;

CREATE table
    metabum_product_images (
        id VARCHAR(255) PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        small_img VARCHAR(255) NOT NULL,
        medium_img VARCHAR(255) NOT NULL,
        big_img VARCHAR(255) NOT NULL
    );

DROP TABLE metabum_product_images;

SELECT * FROM metabum_product_images;

DESCRIBE metabum_product_images;

CREATE TABLE
    metabum_product_technical_information (
        id VARCHAR(255) PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        info JSON NOT NULL
    );

DESCRIBE metabum_product_technical_information;

ALTER TABLE metabum_products
ADD
    COLUMN category VARCHAR(255) NOT NULL;

CREATE TABLE
    metabum_product_evaluation (
        id VARCHAR(255) NOT NULL PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        rating INT CHECK (
            rating >= 0
            AND rating <= 5
        ),
        pros VARCHAR(255) NOT NULL,
        cons VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    );

ALTER TABLE metabum_products
ADD
    COLUMN useful INT NOT NULL DEFAULT 0;

DROP TABLE metabum_product_evaluation;

--Cart--Cart--Cart--Cart--Cart--Cart--Cart--Cart--Cart--Cart--Cart--Cart

CREATE TABLE
    metabum_cart (
        user_id VARCHAR(255) NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        product_src VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_price INT NOT NULL,
        quantity INT NOT NULL
    );

SELECT * FROM metabum_cart;

DROP TABLE metabum_cart;

CREATE TABLE
    metabum_favorites (
        user_id VARCHAR(255) NOT NULL,
        product_id VARCHAR(255) NOT NULL PRIMARY KEY,
        product_src VARCHAR(255) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_brand VARCHAR(255) NOT NULL,
        product_price INT NOT NULL
    );

DROP TABLE metabum_favorites;

------------- ADRESS ------------ ADRESSS------------

CREATE TABLE
    metabum_user_address (
        id VARCHAR(255) NOT NULL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        zip_code BIGINT NOT NULL,
        identification VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        number INT,
        complement VARCHAR(255),
        reference VARCHAR(255),
        neighborhood VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        uf VARCHAR(255) NOT NULL
    );

Drop TABLE metabum_user_address;

SELECT * FROM metabum_user_address;

---------------------------------------

-- CREATE TABLE

--     metabum_creditPayment (

--         id VARCHAR(255) PRIMARY KEY,

--         user_id VARCHAR(255) NOT NULL,

--         product_id VARCHAR(255) NOT NULL,

--         card_number VARCHAR(255) NOT NULL,

--         card_name VARCHAR(255) NOT NULL,

--         card_validation DATE NOT NULL,

--         date DATE NOT NULL

--     );

-- DROP TABLE metabum_creditPayment;

-- SELECT * FROM metabum_creditPayment;

-- CREATE TABLE

--     metabum_boletoPayment (

--         id VARCHAR(255) PRIMARY KEY,

--         user_id VARCHAR(255) NOT NULL,

--         product_id VARCHAR(255) NOT NULL,

--         date DATE NOT NULL,

--         bar_code VARCHAR(255) NOT NULL UNIQUE

--     );

-- SELECT * FROM `metabum_boletoPayment`;

-- DROP TABLE metabum_boletoPayment;

-- CREATE TABLE

--     metabum_card (

--         id VARCHAR(255) PRIMARY KEY,

--         name VARCHAR(255) NOT NULL,

--         number VARCHAR(255) NOT NULL,

--         cvv VARCHAR(255) NOT NULL,

--         validation_date VARCHAR(255) NOT NULL,

--         user_id VARCHAR(255) NOT NULL

--     );

-- DROP TABLE metabum_card;

-- SELECT * FROM metabum_card;