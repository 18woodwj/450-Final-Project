# replace hardcoded 1 with session

# id, name, artists, album, explicit, danceability, energy, song_key,loudness,
# speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration_ms, year

# get users that are not a user's friends
# COULD ADD THEIR PREFERENCES TOO
SELECT email
FROM Users U
WHERE NOT EXISTS (
    SELECT f2_id
    FROM Friends F
    WHERE F.f1_id = 1 AND U.user_id = F.f2_id
) AND U.user_id <> 1
LIMIT 20;

# recommend a bunch of songs that charted from your region that
# you have not saved that have a certain mood
WITH charting_sample AS (
    SELECT DISTINCT song_id
    FROM Charting C
    WHERE region = # your region
    LIMIT 1000
)
SELECT name, artists, album,
       RIGHT(SEC_TO_TIME(ROUND(duration_ms / 1000, 0)), 5) AS Duration
FROM Songs S
JOIN charting_sample CS ON S.id = CS.song_id
WHERE NOT EXISTS (SELECT song_id
                  FROM Saved_Songs SS
                  WHERE SS.user_id = 1 AND S.id = SS.song_id)
WHERE # mood condition
ORDER BY RAND() LIMIT 20;

CREATE INDEX charting_id_idx
ON Charting (song_id);

CREATE INDEX main_song_attrs
ON Songs (name, artists, album, duration_ms);

# same query but noy-otpmized: 42s
WITH current_region AS (
    SELECT region AS curr
    FROM Users
    WHERE user_id = 1
)
    SELECT DISTINCT S.name AS 'Song', S.artists AS 'Artists',
                    S.album AS 'Album', RIGHT(SEC_TO_TIME(ROUND(S.duration_ms / 1000, 0)), 5)
                    AS Duration
    FROM Songs S
    JOIN Charting C on S.id = C.song_id
    JOIN current_region ON C.region = current_region.curr
ORDER BY RAND()
LIMIT 20;

SELECT name, artists, album,
       RIGHT(SEC_TO_TIME(ROUND(duration_ms / 1000, 0)), 5) AS Duration
FROM Songs S JOIN Saved_Songs SS on S.id = SS.song_id
WHERE SS.user_id = 1 # AND mood