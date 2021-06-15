const fs = require('fs');

const userInformation = fs.readFileSync("tests/userInformation.txt").toString().split("\n"),
    TWITTER_USERNAME = userInformation[0],
    TWITTER_PASSWORD = userInformation[1],
    THE_HASHTAG = userInformation[2],
    NUMBER_OF_REPETITIONS = userInformation[3];

module.exports = {
    TWITTER_USERNAME,
    TWITTER_PASSWORD,
    THE_HASHTAG,
    NUMBER_OF_REPETITIONS
};