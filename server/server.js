const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/login', routes.login)

// Route 2 - register as GET 
app.get('/songs', routes.songs)

// Route 3 - register as GET 
app.get('/saved', routes.saved)

// Route 4 - register as GET 
app.get('/charts', routes.charts)

// Route 5 - register as GET 
app.get('/blend', routes.blend)

// Route 6 - register as GET 
app.get('/wrapped', routes.wrapped)






app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
