const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/salary_management_system');
const uuid = require('uuid');

const createTables = async()=>{
    const SQL = `
        DROP TABLE IF EXISTS employee;
        DROP TABLE IF EXISTS department;
        DROP TABLE IF EXISTS education_level;

        CREATE TABLE department(
            id UUID PRIMARY KEY,
            department_name VARCHAR(25) UNIQUE NOT NULL
        );

        CREATE TABLE education_level(
            id UUID PRIMARY KEY,
            degree_level VARCHAR(25) UNIQUE NOT NULL,
        );
        
        CREATE TABLE employee(
            id UUID PRIMARY KEY,
            name VARCHAR(25) UNIQUE NOT NULL,
            position VARCHAR(25) NOT NULL,
            department_name VARCHAR(25) NOT NULL,
            education VARCHAR(25),
            start_date DATE,
            FOREIGN KEY (department_name) REFERENCES department(department_name),
            FOREIGN KEY (education) REFERENCES education_level(degree_level)
        );
    `;
    await client.query(SQL);
};

module.exports = {
    client,
    createTables
};