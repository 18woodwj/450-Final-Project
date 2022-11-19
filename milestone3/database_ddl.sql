CREATE DATABASE SPOTIFY_DB;
USE SPOTIFY_DB;

CREATE TABLE Songs (
    id VARCHAR(50),
    name VARCHAR(255),
    artists VARCHAR(255),
    album VARCHAR(255),
    explicit TINYINT(1),
    danceability DECIMAL(4,3),
    energy DECIMAL(4,3),
    song_key INT(32),
    loudness DECIMAL(4,3),
    speechiness DECIMAL(5,4),
    acousticness DECIMAL(5,4),
    instrumentalness DECIMAL(7,6),
    liveness DECIMAL(5,4),
    valence DECIMAL(4,3),
    tempo DECIMAL(6,3),
    duration_ms INT(32),
    year INT(32),
    PRIMARY KEY (id)
);

CREATE TABLE Charting (
    song_rank INT(32),
    song_id VARCHAR(50),
    region VARCHAR(30),
    chart VARCHAR(7),
    trend VARCHAR(9),
    chart_date DATE,
    PRIMARY KEY (song_id, chart_date, chart, region)
);

CREATE TABLE Users (
    user_id INT(32),
    email VARCHAR(100),
    PRIMARY KEY (user_id)
);

CREATE TABLE Saved_Songs (
    user_id INT(32),
    song_id VARCHAR(50),
    PRIMARY KEY (user_id, song_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (song_id) REFERENCES Songs(id)
);

INSERT INTO Users(user_id, email)
VALUES
    (1, "isk@mail.cz"),
    (2, "vas@yahoo.com"),
    (3, "cyn@gmail.com"),
    (4, "wooddog@gmail.com");

INSERT INTO Saved_Songs(user_id, song_id)
VALUES
    (1, "000JJAuQyGXgrkPCaiZhu5"),
    (1, "000tOaXqLPh2Vce0YOpcui"),
    (2, "000w0ArJhkqt1KIoaCO9l6"),
    (3, "000JJAuQyGXgrkPCaiZhu5"),
    (3, "000B6fUCVkSThxEbewDZ8r");