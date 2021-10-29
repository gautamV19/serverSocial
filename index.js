const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const express = require('express');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/", require('./routes'));

require('./config/mongoConnection');

const port = process.env.PORT || 7000;

app.listen(port, () => { console.log('Listening on port 7000') });