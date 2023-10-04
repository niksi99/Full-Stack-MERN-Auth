require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const MongoDBConnection = require('./server/config/MongoDB');
const app = express();

MongoDBConnection();

app.use(morgan("dev"))
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cookie_parser());

const AuthRoute = require("./server/routes/AuthRoute");

const port = process.env.PORT || 1000;

app.use("/auth", AuthRoute);

app.get("/", (req, res) => {
    res.send("Ради");
});

app.listen(port, () => {
    console.log("http://localhost:"+port)
})