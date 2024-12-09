const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/salary_management_system');
const uuid = require('uuid');

const createTables = async()=>{
    const SQL = `
        DROP TABLE IF EXISTS users;
        CREATE TABLE users(
            id UUID PRIMARY KEY,
            adminhr VARCHAR(20) UNIQUE NOT NULL,
            accountant VARCHAR(20) UNIQUE NOT NULL,
            employee VARCHAR(20) UNIQUE NOT NULL
        );
    `;
    await client.query(SQL);
};

module.exports = {
    client,
    createTables
};