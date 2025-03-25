CREATE DATABASE solapp;
USE solapp;

-- CREATE TABLE `grado`(
--     `grade` int NOT NULL ,
--     PRIMARY KEY(`grade`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- CREATE TABLE `grupo`(
--     `grupo` varchar(1) NOT NULL,
--     PRIMARY KEY(`grupo`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Usuarios`(
    `folio` INT(11) NOT NULL,
    `nombre` VARCHAR(45) NOT NULL,
    `apellidos` VARCHAR(100) NOT NULL,
    `dia` VARCHAR(100) NOT NULL,
    `mes` VARCHAR(100) NOT NULL,
    `año` VARCHAR(100) NOT NULL,
    `grupo` VARCHAR(100) NOT NULL,
    `grado` VARCHAR(100) NOT NULL,
    `turno` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`folio`),
    UNIQUE KEY `folio_UNIQUE` (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;   