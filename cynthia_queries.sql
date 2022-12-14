/* insert users given user_id as int, email as string, region as string*/
INSERT INTO Users
VALUES (user_id, "email", "region");

/* choose 3 random regions */
WITH regions AS (
    SELECT DISTINCT C.region
    FROM Charting C
    LIMIT 50
)
SELECT DISTINCT(regions.region)
FROM regions
ORDER BY RAND() LIMIT 3

/* given region, recommend songs in region's charts based on users's liked songs with artists
with more than 20 songs*/
WITH dance AS
        (SELECT avg(S.danceability) AS danceavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id JOIN Charting C on SS.song_id = C.song_id
        WHERE user_id = 2),
    energy AS
        (SELECT avg(S.energy) AS energyavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id JOIN Charting C on SS.song_id = C.song_id
        WHERE user_id = 2),
    acoustic AS
        (SELECT avg(S.acousticness) AS acavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id JOIN Charting C on SS.song_id = C.song_id
        WHERE user_id = 2),
    instrument AS
        (SELECT avg(S.instrumentalness) AS inavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id JOIN Charting C on SS.song_id = C.song_id
        WHERE user_id = 2)
SELECT DISTINCT(S.name), S.artists
FROM Charting C JOIN Songs S ON S.id = C.song_id, dance, energy, acoustic, instrument
WHERE C.region = "United States" AND
      (dance.danceavg + 0.1 <= S.danceability OR dance.danceavg - 0.1 >= S.danceability) AND
      (energy.energyavg + 0.1 <= S.energy OR energy.energyavg - 0.1 >= S.energy) AND
      (acoustic.acavg + 0.1 <= S.acousticness OR acoustic.acavg - 0.1 >= S.acousticness) AND
      (instrument.inavg + 0.1 <= S.instrumentalness OR instrument.inavg - 0.1 >= S.instrumentalness)
LIMIT 20

/* get chart from own region */
SELECT DISTINCT(S.name), S.artists
FROM Songs S JOIN Charting C on S.id = C.song_id
WHERE C.region = "United States"
LIMIT 20

