const {
    client,
    createTables,
    seedLocations
} = require('./db');

const express = require('express');
const app = express();
app.use(express.json());

/*app.use((err, req, res, next)=> {
    console.log(err);
    res.status(err.status || 500).send({ error: err.message ? err.message : err });
  });
*/
const init = async()=> {
    const port = process.env.PORT || 3000;
    await client.connect();
    console.log('You are now connected to the database.');
    await createTables();
    await seedLocations();
    console.log('You have created all tables.');
    app.listen(port, ()=> console.log(`Listening on port ${port}.`));
};

init();