const puppeteer = require("puppeteer"),
    { selectByName, selectByTestid } = require('./selectors'),
    { TWITTER_USERNAME, TWITTER_PASSWORD, THE_HASHTAG } = require('./getUserInformation');
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
        await page.click(selectByTestid("LoginForm_Login_Button"));
    })

    it('Share Tweets', async() => {
        let sign = "",
            sign_plus = "!",
            hashTag = THE_HASHTAG;

        const tweetTextarea = selectByTestid("tweetTextarea_0"),
            maxLen = THE_HASHTAG.length - 280;

        await page.goto(`${URL}home`);

        for (let i = 0; i < (maxLen * 4); i++) {
            await page.waitForSelector(tweetTextarea).then(async() => {
                await page.click(tweetTextarea)
                await page.type(tweetTextarea, `${hashTag}\n${sign}`)
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