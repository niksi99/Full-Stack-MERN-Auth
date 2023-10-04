require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 1000;

app.get("/", (req, res) => {
    res.send("Ради");
});

app.listen(port, () => {
    console.log("http://localhost:"+port)
})