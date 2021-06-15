const puppeteer = require("puppeteer"),
    { selectByName, selectByTestid } = require('./selectors'),
    { TWITTER_USERNAME, TWITTER_PASSWORD, THE_HASHTAG, NUMBER_OF_REPETITIONS } = require('./getUserInformation');
describe('Share Posts In Twitter', () => {

    let browser, page;
    const URL = "https://twitter.com/";

    before(async() => {
        browser = await puppeteer.launch({ headless: false, slowMo: 1 });
        page = await browser.newPage();
    })

    it('Login Twitter', async() => {
        const usernameOrEmail = selectByName("username_or_email");
        await page.goto(`${URL}login`);
        await page.waitForSelector(usernameOrEmail);
        await page.type(usernameOrEmail, TWITTER_USERNAME);
        await page.type(selectByName("password"), TWITTER_PASSWORD);
        await page.keyboard.down('Tab')
        await page.keyboard.press('Enter')
    })

    it('Share Tweets', async() => {
        let sign = "",
            sign_plus = "!",
            hashTag = THE_HASHTAG;

        const tweetTextarea = selectByTestid("tweetTextarea_0"),

            maxLen = (NUMBER_OF_REPETITIONS !== 0 && typeof NUMBER_OF_REPETITIONS === "number" &&
                NUMBER_OF_REPETITIONS < 280) ? NUMBER_OF_REPETITIONS : 280 - hashTag.length * 4

        await page.goto(`${URL}home`);

        for (let i = 0; i < maxLen; i++) {
            await page.waitForSelector(tweetTextarea).then(async() => {
                await page.click(tweetTextarea);
                await page.type(tweetTextarea, `${hashTag}\n${sign}`);
            })

            if (i === (maxLen || (maxLen * 2) || (maxLen * 3))) { sign = "", hashTag += " "; }
            sign += sign_plus;
            await page.click(selectByTestid("tweetButtonInline"));
            await page.reload();
            await page.waitForTimeout(5000);
        }

    })

    after(async() => {
        await browser.close()
    })


})