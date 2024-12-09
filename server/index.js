const {
    client,
    createTables,
} = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

const init = async()=> {
    const port = process.env.PORT || 3000;
    await client.connect();
    console.log('You are now connected to the database.')
}

await createTables();
console.log('You have created tables.');
app.listen(port, ()=> console.log(`Listening on port ${PORT}.`));

init();