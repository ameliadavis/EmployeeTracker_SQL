CREATE DATABASE  employees_db;

USE employees_db;

CREATE TABLE  department
(
    id int NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE _role 
(
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(6,2), 
    department_id int,
    PRIMARY KEY (id)
);

CREATE TABLE employee 
(
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role_id int,
    manager_id int,
    PRIMARY KEY (id)
)