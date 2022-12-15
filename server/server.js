const express = require('express');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();
var session = require('express-session');

app.use(session({secret: "anyrandomstring"}));

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Register a new user by adding them to the Users table
app.post('/register', routes.register)

// Post a new user to the database
app.post('/authenticate', routes.authenticate)

// Route 2 - register as GET 
app.get('/songs', routes.songs)

// Route 3 - register as GET 
app.get('/saved', routes.saved)

// Route 4 - register as GET 
app.get('/charts', routes.charts)

// Route 6 - register as GET 
app.get('/wrapped', routes.wrapped)

// Route 7 - register as GET 
app.get('/friends', routes.friends)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
