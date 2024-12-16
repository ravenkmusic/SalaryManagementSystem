const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/salary_management_system');
const uuid = require('uuid');

const createTables = async()=>{
    const SQL = `
        DROP TABLE IF EXISTS employee;
        DROP TABLE IF EXISTS department;

        CREATE TABLE department(
            id UUID PRIMARY KEY,
            department_name VARCHAR(25),
        );
        
        CREATE TABLE employee(
            id UUID PRIMARY KEY,
            name VARCHAR(25) UNIQUE NOT NULL,
            position VARCHAR(25) UNIQUE NOT NULL
            department REFERENCES department(department_name)
            start_date DATE,
        );
    `;
    await client.query(SQL);
};

module.exports = {
    client,
    createTables
};