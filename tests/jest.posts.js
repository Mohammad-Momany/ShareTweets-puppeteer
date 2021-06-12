const puppeteer = require("puppeteer"),
    { selectByName, selectByTestid } = require('./utilities'),
    { TWITTER_USERNAME, TWITTER_PASSWORD } = require('./userInformation');
describe('Share Posts In Twitter', () => {
    let browser, page;
    const URL = "https://twitter.com/"
    before(async() => {
        browser = await puppeteer.launch({ headless: false, slowMo: 1 });
        page = await browser.newPage();
    })


    it('Login Twitter', async function() {
        const usernameOrEmail = selectByName("username_or_email")
        await page.goto(`${URL}login`);
        await page.waitForSelector(usernameOrEmail);
        await page.type(usernameOrEmail, TWITTER_USERNAME);
        await page.type(selectByName("password"), TWITTER_PASSWORD);
        await page.click(selectByTestid("LoginForm_Login_Button"));
    })

    it('Share Post', async function() {
        let sign = "",
            sign_plus = "-",
            hashTag = "#فلسطين\n#SaveSheikhJarrah\n#المسجد_الاقصى";

        const tweetTextarea = selectByTestid("tweetTextarea_0"),
            maxLen = 240
        await page.goto(`${URL}home`);

        for (let i = 0; i < 964; i++) {
            await Promise.race([
                page.waitForSelector(tweetTextarea).then(async() => {
                    await page.click(tweetTextarea)
                    await page.type(tweetTextarea, `${hashTag}\n${sign}`)
                }),
            ]);
            if (i === (maxLen || (maxLen * 2) || (maxLen * 3))) { sign = "", hashTag += " " }
            sign += sign_plus;
            await page.click(selectByTestid("tweetButtonInline")),
                page.reload(),
                page.waitForTimeout(5000);
        }

    })
    after(async() => {
        await browser.close()
    })


})