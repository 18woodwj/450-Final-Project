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
 * Check if the user exists, 
 * if so redirect to songs page else flag unindent user
 */
async function login(req, res) {
    res.send("Welcome our 45 project!")
}

/**
 * Grab a selection of songs and sort by category
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

    const trailing_string = `
    ORDER BY RAND() 
    LIMIT 20`

    connection.query(leading_string + `AND ${happy}` + trailing_string, function (error, results, fields) {
        if (error) {
            res.json({ error: error })
        } else if (results) {
            t_results.push({happy: results});
            connection.query(leading_string + `AND ${sad}` + trailing_string, function (error, results, fields) {
                if (error) {
                    res.json({ error: error })
                } else if (results) {
                    t_results.push({sad: results});
                    connection.query(`
                    WITH non_friends AS (
                        SELECT user_id, email
                        FROM Users U
                        WHERE NOT EXISTS (
                            SELECT f2_id
                            FROM Friends F
                            WHERE F.f1_id = 1 AND U.user_id = F.f2_id
                        ) AND U.user_id <> ${req.session.user_id}
                    ), non_friend_aggregates AS (
                        SELECT email, AVG(energy) AS avg_energy, AVG(danceability) AS avg_dance,
                                        AVG(loudness) AS avg_loud, AVG(acousticness) AS avg_acoust
                        FROM non_friends N
                            JOIN Saved_Songs SS ON SS.user_id = N.user_id
                            JOIN Songs S ON S.id = SS.song_id
                        GROUP BY email
                    ), my_stats AS (
                        SELECT AVG(energy) AS my_energy, AVG(danceability) AS my_dance,
                                        AVG(loudness) AS my_loud, AVG(acousticness) AS my_acoust
                        FROM Songs S
                        JOIN (SELECT song_id
                                FROM Saved_Songs
                                WHERE user_id = ${req.session.user_id}) Me on S.id = Me.song_id
                    )
                    SELECT email, ABS(my_energy - avg_energy) AS e_dif,
                            ABS(my_dance - avg_dance) AS d_dif, ABS(my_energy - avg_energy) AS e_dif,
                            ABS(my_loud - avg_loud) AS l_dif, ABS(my_acoust - avg_acoust) AS a_dif,
                            (SELECT e_dif) + (SELECT d_dif) + (SELECT l_dif) + (SELECT a_dif) AS total_distance
                    FROM non_friend_aggregates, my_stats
                    ORDER BY total_distance;`, function (error, results, fields) {
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

/**
 * Send data for the regions most closely related to the user region
 * Grab the top 20 songs per region
 * For each region, of the 20, pick the 5 the user is most likely to enjoy
 * based on liked songs
 * 
 */
async function charts(req, res) {
    //TODO: Cynth
    req.session.user_id = 4 //TODO: change this later
    req.session.user_region = "United States" //TODO: change this later
    regions = []
    t_results = []

    const first_half = 
    `WITH dance AS
        (SELECT avg(S.danceability) AS danceavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id JOIN Charting C on SS.song_id = C.song_id
        WHERE user_id = ${req.session.user_id}),
    energy AS
        (SELECT avg(S.energy) AS energyavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id JOIN Charting C on SS.song_id = C.song_id
        WHERE user_id = ${req.session.user_id}),
    acoustic AS
        (SELECT avg(S.acousticness) AS acavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id JOIN Charting C on SS.song_id = C.song_id
        WHERE user_id = ${req.session.user_id}),
    instrument AS
        (SELECT avg(S.instrumentalness) AS inavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id JOIN Charting C on SS.song_id = C.song_id
        WHERE user_id = ${req.session.user_id})
    SELECT DISTINCT(S.name), S.artists
    FROM Charting C JOIN Songs S ON S.id = C.song_id, dance, energy, acoustic, instrument
    WHERE C.region = "`

    const second_half = 
    `" AND
        (dance.danceavg + 0.1 <= S.danceability OR dance.danceavg - 0.1 >= S.danceability) AND
        (energy.energyavg + 0.1 <= S.energy OR energy.energyavg - 0.1 >= S.energy) AND
        (acoustic.acavg + 0.1 <= S.acousticness OR acoustic.acavg - 0.1 >= S.acousticness) AND
        (instrument.inavg + 0.1 <= S.instrumentalness OR instrument.inavg - 0.1 >= S.instrumentalness)
    LIMIT 20;`

    connection.query(
        `WITH regions AS (
            SELECT DISTINCT C.region
            FROM Charting C
            LIMIT 50
        )
        SELECT DISTINCT regions.region AS region
        FROM regions
        ORDER BY RAND() LIMIT 3;`, function(error, results, fields) {
            if (error) {
                res.json({error: error})
            } else {
                results = JSON.parse(JSON.stringify(results))
                regions.push({regions: results});
                console.log(regions[0].regions[0].region);
                connection.query(first_half + `${regions[0].regions[0].region}` + second_half, function (error, results, fields) {
                    if (error) {
                        res.json({ error: error })
                    } else if (results) {
                        t_results.push({region1: results});
                        connection.query(first_half + `${regions[0].regions[1].region}` + second_half, function (error, results, fields) {
                            if (error) {
                                res.json({ error: error })
                            } else if (results) {
                                t_results.push({region2: results});
                                connection.query(first_half + `${regions[0].regions[2].region}` + second_half, function (error, results, fields) {
                                    if (error) {
                                        res.json({ error: error })
                                    } else if (results) {
                                        t_results.push({region3: results});
                                        connection.query(
                                            `SELECT DISTINCT(S.name), S.artists
                                            FROM Songs S JOIN Charting C on S.id = C.song_id
                                            WHERE C.region = '${req.session.user_region}'
                                            LIMIT 20;`, function(error, results, fields) {
                                                if (error) {
                                                    res.json({ error: error})
                                                } else if (results) {
                                                    t_results.push({user_region: results});
                                                    res.json({ results: t_results })
                                                }
                                            }
                                        )
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    )
}

/**
 * 
 * 
 */
async function wrapped(req, res) {
    //TODO: John
    req.session.user_id = 3 // to replace later with a response object
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
            } else {
                // check if results are null on the front end
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
                        } else {
                            // check if results are null on the front end
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
                                    } else {
                                        // check if results are null on the front end
                                        t_results.push({avg_song_atr: results});
                                        connection.query(
                                            `
                                            SELECT name, Count(region) AS num_regions, min(m_rank) as min_rank FROM (
                                                SELECT name, region, min(song_rank) as m_rank FROM (
                                                    SELECT name, region, song_rank FROM Saved_Songs SS
                                                    JOIN Songs S ON SS.song_id = S.id
                                                    JOIN Charting C ON C.song_id = S.id
                                                    WHERE SS.user_id = 3) AS ss_chart
                                                GROUP BY name, region
                                                ORDER BY m_rank DESC) AS num_r_m
                                            GROUP BY name


                                            `, function (error, results, fields) {
                                                if (error) {
                                                    res.json({error: error})
                                                } else {
                                                    t_results.push({chart_regions: results});
                                                    console.log(t_results);
                                                    res.json(t_results);

                                                }
                                            }
                                        )

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