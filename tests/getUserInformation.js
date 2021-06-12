const fs = require('fs');

const userInformation = fs.readFileSync("tests/userInfo.txt").toString().split("\n"),
    TWITTER_USERNAME = userInformation[0],
    TWITTER_PASSWORD = userInformation[1],
    THE_HASHTAG = userInformation[2];

module.exports = {
    TWITTER_USERNAME,
    TWITTER_PASSWORD,
    THE_HASHTAG
};