-- Drops the employee_db if it already exists --
DROP DATABASE IF EXISTS employee_db;
-- Create a database called employee_db --
CREATE DATABASE employee_db;

-- Use employee_db for the following statements --
USE employee_db;

CREATE TABLE employee(
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
  -- Create a string column called "first name" --
first_name VARCHAR(30),
-- Create a string column called "last name" --
last_name VARCHAR(30),
  -- Create an integer column called "role id" --
role_id INTEGER NULL,
 --Create an integer columne called "manager id"--
 manager_id INTEGER NULL
);

CREATE TABLE department(
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
  -- Create a string column called "department name" --
department_name VARCHAR(30)
);

CREATE TABLE role(
  -- Create a numeric column called "id" which will automatically increment its default value as we create new rows. --
id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
  -- Create a string column called "title" --
title VARCHAR(30),
  -- Create an integer column called "salary" --
salary DECIMAL(10,4) NULL,
 --Create an integer columne called "department id"--
 department_id INTEGER NULL,
);
