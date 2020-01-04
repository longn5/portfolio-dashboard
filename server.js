const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlPaser: true
}).then( () => {
    console.log("succesfully connected to the mongo database")
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
})

app.get('/welcome', (req,res) => {
    res.send({"message": "Welcome to Long's Porfolio Dashboard"})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})