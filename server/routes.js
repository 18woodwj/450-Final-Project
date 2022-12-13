const config = require('./config.json')
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.urlencoded());
app.use(session({secret : 'innit mate', user_id : 1}));

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

/**
 * Check if the userm exists, 
 * if so redirect to songs page else flag unident user
 */
async function login(req, res) {
    res.send("Welcome our 45 project!")
}

/**
 * Grab a selection of songs anmd sort by category
 */
async function songs(req, res) {
    console.log(req.session);
    // connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value  
    // FROM Players 
    // ORDER BY Name
    // LIMIT ${req.query.page * pagesize - pagesize}, ${pagesize}`, function (error, results, fields) {
    //     if (error) {
    //         res.json({ error: error })
    //     } else if (results) {
    //         res.json({ results: results })
    //     }
    // });
}

/**
 * Send data for the regions most closely related to the user region
 * Grab the top 20 songs per region
 * For each region, of the 20, pick the 5 the user is most likely to enjoy
 * based on liked songs
 * 
 */
async function charts(req, res) {
    //TODO: Cynth

}

/**
 * 
 * 
 */
async function wrapped(req, res) {
    //TODO: John

}


/**
 * 
 * 
 */
async function saved(req, res) {
    //TODO: Isk

}

/**
 * 
 */
async function blend(req, res) {
    //TODO: John

}

module.exports = {
    login,
    songs,
    saved,
    charts,
    blend,
    wrapped
}