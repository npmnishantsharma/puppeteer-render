const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
require("dotenv").config();

const scrapeLogic = async (res,text) => {
  try{
  const browser = await puppeteer.launch({
    headless:true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
const page = await browser.newPage();
await page.goto('https://www.craiyon.com');

const input = await page.$('#prompt');
if (input) {
  await input.type(text);
}

const parent = await input?.getProperty('parentNode');
const button = await parent?.$('button');
if (button) {
  await button.click();
}
page.waitForTimeout(65000);
const selector = `img`;
await page.waitForSelector(selector, {
  timeout: 12e4,
});

const imgs = await page.$$eval(selector, (imgs) => imgs.map((img) => img.getAttribute('src')));
await browser.close();
if (imgs.length && imgs[0] !== null) {
  console.log(imgs)
}
}catch(err){
  console.log(err)
}


}
module.exports = { scrapeLogic };
