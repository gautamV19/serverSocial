const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const express = require('express');
const passport = require('passport');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/", require('./routes'));

app.use(passport.initialize());

require('./config/mongoConnection');

const port = process.env.PORT || 7002;

app.listen(port, () => { console.log('Listening on port', port) });