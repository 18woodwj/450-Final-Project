const express = require('express');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();
const session = require('express-session');

app.use(session({secret: "anyrandomstring", user_id: 1}));

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
//app.get('/register', routes.login)

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

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
