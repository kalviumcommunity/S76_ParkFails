const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();

const app = express()
app.use(cors());
const PORT = process.env.PORT || 3000;
const Database = require('./DataBase');
app.use(express.json());  

const routes = require('./routes')
app.use('/api', routes);

Database.connectDatabase();

app.get('/', function(req, res) {
    const connectionStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.send(`Database Connection Status: ${connectionStatus}`);
});

app.get('/ping',function(req,res){
    res.send('pong')
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, function () {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;  




