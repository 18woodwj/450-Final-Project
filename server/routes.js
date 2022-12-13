const config = require('./config.json')
const mysql = require('mysql');

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
    req.session.user_id = 1
    req.session.user_region = "Argentina"

    happy = "danceability >= 0.6 AND energy >= 0.6 AND liveness >= 0.21"
    sad = "liveness < 0.19 AND acousticness > 0.34 AND energy < 0.55 AND danceability < 0.50"
    angry = ""
    dance = "danceability > 0.60 AND liveness > 0.23"

    connection.query(`
    WITH charting_sample AS (
        SELECT DISTINCT song_id
        FROM Charting C
        WHERE region = '${req.session.user_region}'
        LIMIT 1000
    )
    SELECT name, artists, album,
           RIGHT(SEC_TO_TIME(ROUND(duration_ms / 1000, 0)), 5) AS Duration
    FROM Songs S
    JOIN charting_sample CS ON S.id = CS.song_id
    WHERE NOT EXISTS (SELECT song_id
                      FROM Saved_Songs SS
                      WHERE SS.user_id = ${req.session.user_id} AND S.id = SS.song_id)
    AND ${sad}
    ORDER BY RAND() 
    LIMIT 20`, function (error, results, fields) {
        if (error) {
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });
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