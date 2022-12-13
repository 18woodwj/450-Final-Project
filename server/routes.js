const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// EXAMPLE

// async function all_matches(req, res) {
//     // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
//     // We have partially implemented this function for you to 
//     // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
//     // we didn't specify this default value for league, and you could change it if you want! 
//     // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here... 
//     const league = req.params.league ? req.params.league : 'D1'
//     // use this league encoding in your query to furnish the correct results

//     if (req.query.page && !isNaN(req.query.page)) {
//         // This is the case where page is defined.
//         // The SQL schema has the attribute OverallRating, but modify it to match spec! 
//         // TODO: query and return results here:
   
//     } else {
//         // we have implemented this for you to see how to return results by querying the database
//         connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
//         FROM Matches 
//         WHERE Division = '${league}'
//         ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {

//             if (error) {
//                 console.log(error)
//                 res.json({ error: error })
//             } else if (results) {
//                 res.json({ results: results })
//             }
//         });
//     }
// }

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
    

}

/**
 * Send data for the regions most closely related to the user region
 * Grab the top 20 songs per region
 * For each region, of the 20, pick the 5 the user is most likely to enjoy
 * based on liked songs
 * 
 */
async function charts(req, res) {

}

/**
 * 
 * 
 */
async function wrapped(req, res) {

}

/**
 * 
 * 
 */
async function song(req,res) {

}

/**
 * 
 * 
 */
async function saved(req, res) {

}

/**
 * 
 */
async function blend(req, res) {

}




module.exports = {
    login,
    songs,
    saved,
    charts,
    blend,
    wrapped
}