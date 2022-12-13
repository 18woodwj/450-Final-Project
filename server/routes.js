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

const happy = "danceability >= 0.6 AND energy >= 0.6 AND liveness >= 0.21"
const sad = "liveness < 0.19 AND energy < 0.55 AND danceability < 0.50"
const think = "energy < 0.5"
const dance = "danceability > 0.60 AND liveness > 0.23"

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

    // store results: recommended songs for mood as well as suggested users
    t_results = []

    const leading_string = `
    WITH charting_sample AS (
        SELECT DISTINCT song_id
        FROM Charting C
        WHERE region = '${req.session.user_region}'
        LIMIT 2000
    )
    SELECT name, artists, album,
           RIGHT(SEC_TO_TIME(ROUND(duration_ms / 1000, 0)), 5) AS Duration
    FROM Songs S
    JOIN charting_sample CS ON S.id = CS.song_id
    WHERE NOT EXISTS (SELECT song_id
                      FROM Saved_Songs SS
                      WHERE SS.user_id = ${req.session.user_id} AND S.id = SS.song_id)
                      `

    const trailing_string = `ORDER BY RAND() 
    LIMIT 20`

    connection.query(leading_string + `AND ${dance}` + trailing_string, function (error, results, fields) {
        if (error) {
            res.json({ error: error })
        } else if (results) {
            t_results.push({dance: results});
            connection.query(leading_string + `AND ${sad}` + trailing_string, function (error, results, fields) {
                if (error) {
                    res.json({ error: error })
                } else if (results) {
                    t_results.push({sad: results});
                    connection.query(leading_string + `AND ${think}` + trailing_string, function (error, results, fields) {
                        if (error) {
                            res.json({ error: error })
                        } else if (results) {
                            t_results.push({think: results});
                            connection.query(leading_string + `AND ${happy}` + trailing_string, function (error, results, fields) {
                                if (error) {
                                    res.json({ error: error })
                                } else if (results) {
                                    t_results.push({friends: results});
                                    connection.query(`
                                        SELECT email
                                        FROM Users U
                                        WHERE NOT EXISTS (
                                            SELECT f2_id
                                            FROM Friends F
                                            WHERE F.f1_id = 1 AND U.user_id = F.f2_id
                                        ) AND U.user_id <> ${req.session.user_id}
                                        LIMIT 20`, function (error, results, fields) {
                                        if (error) {
                                            res.json({ error: error })
                                        } else if (results) {
                                            t_results.push({happy: results});
                                            res.json({ results: t_results })
                                        }
                                    })
                                }
                            });    
                        }
                    });
                }
            });
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
    req.session.user_id = 3
    t_results = []
    connection.query(
        `SELECT SS.user_id, SUBSTRING_INDEX(S.artists, ',', 1) as main_artist, COUNT(S.id) as num FROM Saved_Songs SS
        JOIN Songs S  ON S.id = SS.song_id
        WHERE SS.user_id = ${req.session.user_id}
        GROUP BY main_artist
        ORDER BY num DESC
        LIMIT 3`, function(error, results, fields) {
            if (error) {
                res.json({error: error})
            } else if (results) {
                t_results.push({artists: results});
                connection.query(
                    `
                    WITH u_friends AS (
                        SELECT U.user_id, F.f2_id as friend FROM Users U
                            JOIN Friends F on U.user_id = F.f1_id
                        WHERE U.user_id = 3
                    ),
                    
                    avg_f_atr AS (
                        (SELECT UF.friend AS user, avg(liveness) AS avg_l, avg(energy) AS avg_e, avg(danceability) AS avg_d, avg(acousticness) AS avg_a
                        FROM u_friends UF
                            JOIN Saved_Songs SS ON SS.user_id = UF.friend
                            JOIN Songs S on S.id = SS.song_id
                        GROUP BY friend)
                        UNION
                        (SELECT U.user_id, avg(liveness) AS avg_l, avg(energy) AS avg_e, avg(danceability) AS avg_d, avg(acousticness) AS avg_a
                        FROM Users U
                            JOIN Saved_Songs SS ON SS.user_id = U.user_id
                            JOIN Songs S ON S.id = SS.song_id
                        WHERE U.user_id = 3
                        GROUP BY U.user_id
                        )
                    )
                    
                    SELECT * FROM (
                        SELECT *,  PERCENT_RANK() over (ORDER BY avg_l) AS  percent_l,
                           PERCENT_RANK() over (ORDER BY avg_e) AS  percent_e,
                           PERCENT_RANK() over (ORDER BY avg_d) AS  percent_d,
                           PERCENT_RANK() over (ORDER BY avg_a) AS  percent_a
                           FROM avg_f_atr AS afa
                                  ) AS total_p
                    WHERE user = 3


                    `, function (error, results, fields) {
                        if (error) {
                            res.json({error: error});
                        } else if (results) {
                            t_results.push({percentiles: results});
                            connection.query(
                                `
                                SELECT SS.user_id, avg(liveness) AS avg_l, avg(energy) AS avg_e, avg(danceability) AS avg_d, avg(acousticness) AS avg_a
                                FROM Saved_Songs SS
                                    JOIN Songs S ON S.id = SS.song_id
                                WHERE SS.user_id = 3
                                GROUP BY SS.user_id
                                
                                `, function (error, results, fields) {
                                    if (error) {
                                        res.json({error: error});
                                    } else if (results) {
                                        t_results.push({avg_song_atr: results})
                                        res.json(t_results);
                                    }

                                }
                            );
                            


                        }

                    }
                );

            }
        });

}


/**
 * 
 * 
 */
async function saved(req, res) {
    req.session.user_id = 1
    req.session.user_region = "Argentina"

    // case on mood


    connection.query(`
    SELECT name, artists, album,
    RIGHT(SEC_TO_TIME(ROUND(duration_ms / 1000, 0)), 5) AS Duration
    FROM Songs S JOIN Saved_Songs SS on S.id = SS.song_id
    WHERE SS.user_id = ${req.session.user_id}`, function (error, results, fields) {
        if (error) {
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })
        }
    });    
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