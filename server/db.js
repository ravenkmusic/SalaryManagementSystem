const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/salary_management_system');
const uuid = require('uuid');