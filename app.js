const pup = require("puppeteer");

const start = async () => {
  const browser = await pup.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto("https://www.twitter.com/login", {
    waitUntil: "networkidle2",
  });
  await page.type("input[name='session[username_or_email]']", "your_username");
  await page.type("input[name='session[password]']", "your_password");
  await page.click('div[data-testid="LoginForm_Login_Button"]');
  await page.waitForNavigation({
    waitUntil: "networkidle2",
  });
  let i;
  const keepLiking = async () => {
    let like_count = 0;
    if (like_count === 30) {
      clearInterval(i);
      setTimeout(() => {
        like_count = 0;
        keepLiking();
      }, 10000);
    } else {
      i = setInterval(async () => {
        like_count += 1;
        await page.click('div[data-testid="like"]');
        await page.waitForTimeout(1500);
        keepLiking();
      }, 3000);
    }
  };
  keepLiking();
};

start();
