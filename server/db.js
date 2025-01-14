const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/salary_management_system');
const uuid = require('uuid');
const states = require('./USStates');

const createTables = async()=>{
    const SQL = `
        DROP TABLE IF EXISTS employee;
        DROP TABLE IF EXISTS department;
        DROP TABLE IF EXISTS education_level;
        DROP TABLE IF EXISTS location;
        DROP TABLE IF EXISTS compensation;

        CREATE TABLE department(
            id UUID PRIMARY KEY,
            department_name VARCHAR(25) UNIQUE NOT NULL
        );

        CREATE TABLE education_level(
            id UUID PRIMARY KEY,
            degree_level VARCHAR(25) UNIQUE NOT NULL,
        );

        CREATE TABLE location(
            id UUID PRIMARY KEY,
            state_in_us VARCHAR(25) UNIQUE NOT NULL,
        );
        
        CREATE TABLE employee(
            id UUID PRIMARY KEY,
            fname_lname VARCHAR(35) NOT NULL,
            position VARCHAR(25) NOT NULL,
            department_name VARCHAR(25) NOT NULL,
            education VARCHAR(25),
            start_date DATE,
            location_id UUID,
            base_yearly_salary NUMERIC(7,2),
            FOREIGN KEY (location_id) REFERENCES location(id),
            FOREIGN KEY (department_name) REFERENCES department(department_name),
            FOREIGN KEY (education) REFERENCES education_level(degree_level)
        );

        CREATE TABLE current_payroll(
            id UUID PRIMARY KEY,
            employee_id UUID,
            days_worked NUMERIC(2, 2),
            pto_hours_used NUMERIC(2, 2),
            paid_leave_hours_used NUMERIC(2, 2),
            unpaid_hours_used NUMERIC(2, 2),
            pay_date DATE,
            FOREIGN KEY (employee_id) REFERENCES employee(id)
        );
    `;
    await client.query(SQL);

};

const seedLocations = async () => {
    const SQL = `
      INSERT INTO location (id, state_in_us)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING;
    `;
    for (const state of states) {
      await client.query(SQL, [uuid.v4(), state]);
    }
};

const createEmployee = async ({fname_lname, position, department_name, education, start_date, location_id, base_yearly_salary}) => {
    const SQL = `
      INSERT INTO employee(id, fname_lname, position, department_name, education, start_date, location_id, base_yearly_salary)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const response = await client.query(SQL, [uuid.v4(), fname_lname, position, department_name, education, start_date, location_id, base_yearly_salary]);
    return response.rows[0];
};

module.exports = {
    client,
    createTables,
    seedLocations,
    createEmployee
};