    # replace hardcoded 1 with session

    # id, name, artists, album, explicit, danceability, energy, song_key,loudness,
    # speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration_ms, year

# get users that are not a user's friends
# we could add their preferences here too
SELECT email
FROM Users U
WHERE NOT EXISTS (
    SELECT f2_id
    FROM Friends F
    WHERE F.f1_id = 1 AND U.user_id = F.f2_id
) AND U.user_id <> 1
LIMIT 20;

# SHOW 20 SONGS WITH SOME CRITERIUM
WITH current_region AS (
    SELECT region AS curr
    FROM Users
    WHERE user_id = 1
),
    non_randomly_ordered AS (
    SELECT *
    FROM Songs S
        JOIN Charting C on S.id = C.song_id
        JOIN current_region ON C.region = current_region.curr
)
    SELECT DISTINCT N.name AS 'Song', N.artists AS 'Artists',
                    N.album AS 'Album', RIGHT(SEC_TO_TIME(ROUND(N.duration_ms / 1000, 0)), 5)
                    AS Duration
    FROM non_randomly_ordered N
    JOIN (SELECT N2.id FROM non_randomly_ordered N2 ORDER BY RAND() LIMIT 20) AS R ON N.id = R.id;

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