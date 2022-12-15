use SPOTIFY_DB

# John's queries

# 1. Grab a user's three most referenced artists (test for user 3)
# Schema: {user, artist, num}

SELECT SS.user_id, SUBSTRING_INDEX(S.artists, ',', 1) as main_artist, COUNT(S.id) as num FROM Saved_Songs SS
    JOIN Songs S  ON S.id = SS.song_id
WHERE U.user_id = 3
GROUP BY main_artist
ORDER BY num DESC
LIMIT 3

# 2. Determine the % atr of a user's saved songs with respect to their friends
# Schema: {user_id, Liveness, Energy, Danceability, Acousticness, Tempo}

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

# 3. Grab the average attributes for a user's saves songs
# Schema: {user_id, avg_l, avg_e, avg_d, avg_a}
SELECT SS.user_id, avg(liveness) AS avg_l, avg(energy) AS avg_e, avg(danceability) AS avg_d, avg(acousticness) AS avg_a
    FROM Saved_Songs SS
        JOIN Songs S ON S.id = SS.song_id
    WHERE SS.user_id = 3
    GROUP BY SS.user_id

# 4. Of your saved songs, determine if they have charted and in which regions
# Schema: {name, region}

SELECT name, Count(region) AS num_regions, min(m_rank) as min_rank FROM (
    SELECT name, region, min(song_rank) as m_rank FROM (
        SELECT name, region, song_rank FROM Saved_Songs SS
        JOIN Songs S ON SS.song_id = S.id
        JOIN Charting C ON C.song_id = S.id
        WHERE SS.user_id = 3) AS ss_chart
    GROUP BY name, region
    ORDER BY m_rank DESC) AS num_r_m
GROUP BY name


















