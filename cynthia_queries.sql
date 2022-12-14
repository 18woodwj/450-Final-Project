/* insert users given user_id as int, email as string, region as string*/
INSERT INTO Users
VALUES (user_id, "email", "region");

/* given region, recommend songs in region's charts based on users's liked songs with artists
with more than 20 songs*/
WITH dance AS
        (SELECT avg(S.danceability) AS danceavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id
        WHERE user_id = 2),
    energy AS
        (SELECT avg(S.energy) AS energyavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id
        WHERE user_id = 2),
    acoustic AS
        (SELECT avg(S.acousticness) AS acavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id
        WHERE user_id = 2),
    instrument AS
        (SELECT avg(S.instrumentalness) AS inavg
        FROM Saved_Songs SS JOIN Songs S ON SS.song_id = S.id
        WHERE user_id = 2)
SELECT DISTINCT(S.name), S.artists
FROM Charting C JOIN Songs S ON S.id = C.song_id, dance, energy, acoustic, instrument
WHERE C.region = "United States" AND
      (dance.danceavg + 0.3 <= S.danceability OR dance.danceavg - 0.3 >= S.danceability) AND
      (energy.energyavg + 0.2 <= S.energy OR energy.energyavg - 0.2 >= S.energy) AND
      (acoustic.acavg + 0.2 <= S.acousticness OR acoustic.acavg - 0.2 >= S.acousticness) AND
      (instrument.inavg + 0.2 <= S.instrumentalness OR instrument.inavg - 0.2 >= S.instrumentalness)
LIMIT 10