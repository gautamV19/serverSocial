const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const express = require('express');
const passport = require('passport');

const app = express();
app.use(passport.initialize());

app.use(express.urlencoded());
app.use(express.json());

app.use("/", require('./routes'));


require('./config/mongoConnection');

//** Chat connection **/
const socket = require("socket.io")
const cors = require("cors");

app.use(cors());
app.use(express.json());

const chatport = 4000;

const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets.js").chatSockets(chatServer);
chatServer.listen(chatport);
console.log("chat server is listening on chatport", chatport);


const port = process.env.PORT || 7002;

//** deploying on heroku */

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
}

app.listen(port, () => { console.log('Listening on port', port) });