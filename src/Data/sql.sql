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

ALTER TABLE metabum_products
ADD
    COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

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

ALTER TABLE metabum_cart
ADD
    COLUMN product_brand VARCHAR(255) NOT NULL;

------------- Favorites------------ Favorites------------

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

INSERT INTO
    metabum_product_technical_information (id, title, product_id, info)
VALUES (
        UUID(),
        'Características',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "Marca": "Gigabyte",
        "Modelo": "B450M DS3H V2"
    }'
    ), (
        UUID(),
        'CPU',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "Soquete AM4": "Suporta AMD Ryzen 5000G Séries / Ryzen de 2ª Geração / Ryzen de 1ª Geração / Ryzen de 2ª Geração com Gráficos Radeon Vega / Ryzen de 1ª Geração com Gráficos Radeon Vega / Athlon com Processadores Gráficos Radeon Vega"
    }'
    ), (
        UUID(),
        'Chipset',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "AMD B450": ""
    }'
    ), (
        UUID(),
        'Memória',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "4 x soquetes DDR4 DIMM com suporte para até 64 GB de memória do sistema": "",
        "Arquitetura de memória dual channel": "",
        "Suporte para módulos de memória DDR4 3600 (OC) / 3466 (OC) / 3200 (OC) / 2933/2667/2400/2133 MHz": "",
        "Suporte para módulos de memória DIMM 1Rx8 / 2Rx8 sem buffer ECC (operar em modo não ECC)": "",
        "Suporte para módulos de memória DIMM 1Rx8 / 2Rx8 / 1Rx16 não-ECC e sem buffer": "",
        "Suporte para módulos de memória Extreme Memory Profile (XMP)": ""
    }'
    ), (
        UUID(),
        'Processador gráfico integrado',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "1 porta DVI-D, suportando uma resolução máxima de 1920x1200 @ 60 Hz": "",
        "1 porta HDMI, suportando uma resolução máxima de 4096x2160 @ 60 Hz": "",
        "Memória compartilhada máxima de 16 GB": ""
    }'
    ), (
        UUID(),
        'Áudio',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "Codec Realtek ALC887": "",
        "Áudio de alta definição": "",
        "2/4 / 5.1 / 7.1 canais": "",
        "Suporte para S / PDIF Out": ""
    }'
    ), (
        UUID(),
        'LAN',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "Chip Realtek GbE LAN (10/100/1000 Mbit)": ""
    }'
    ), (
        UUID(),
        'Slots de expansão',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "1 x slot PCI Express x16, rodando a x16 (PCIEX16) (Nota)": "",
        "1 x slot PCI Express x16, rodando a x4 (PCIEX4)": "",
        "1 slot PCI Express x1": "",
        "Suporte para tecnologias AMD Quad-GPU CrossFire e AMD CrossFire de 2 vias": ""
    }'
    ), (
        UUID(),
        'Interface de armazenamento',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "1 x conector M.2 (soquete 3, chave M, tipo 2242/2260/2280/22110 SATA e PCIe x4 / x2 suporte a SSD)": "",
        "4 conectores SATA 6 Gb / s": "",
        "Suporte para RAID 0, RAID 1 e RAID 10": ""
    }'
    ), (
        UUID(),
        'Conectores internos I/O',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "1 x conector de alimentação principal ATX de 24 pinos": "",
        "1 x conector de alimentação ATX 12V de 8 pinos": "",
        "1 x header do ventilador da CPU": "",
        "1 x header do ventilador do sistema": "",
        "1 x conector M.2 soquete 3": "",
        "4 conectores SATA 6 Gb / s": "",
        "1 x header do painel frontal": "",
        "1 x conector de áudio do painel frontal": "",
        "1 x header S / PDIF Out": "",
        "1 x tira de LED de refrigerador de CPU / cabeçalho de tira de LED RGB": "",
        "1 x conector USB 3.1 Gen 1": "",
        "2 conectores USB 2.0 / 1.1": "",
        "1 x header Trusted Platform Module (TPM) (2x10 pinos, apenas para o módulo GC-TPM2.0)": "",
        "1 x header de porta serial": "",
        "1 x jumper CMOS claro": ""
    }'
    ), (
        UUID(),
        'Conectores painel traseiro',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "1 porta de teclado / mouse PS / 2": "",
        "1 porta DVI-D": "",
        "1 porta HDMI": "",
        "4 portas USB 3.1 Gen 1": "",
        "4 portas USB 2.0 / 1.1": "",
        "1 porta RJ-45": "",
        "3 entradas de áudio": ""
    }'
    ), (
        UUID(),
        'Controlador I/O',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "iTE I/O Chip controlador": ""
    }'
    ), (
        UUID(),
        'Monitoramento H/M',
        '9c3653da-21b2-4776-9dbf-1bd670abd2fe',
        '{
        "Detecção de tensão": "",
        "Detecção de temperatura": "",
        "Detecção de velocidade do ventilador": "",
        "Aviso de superaquecimento": "",
        "Alerta de falha do ventilador": "",
        "Controle de velocidade": "",
        "Se a função de controle de velocidade do ventilador é suportada, isso dependerá do refrigerador instalado.": ""
    }'
    );