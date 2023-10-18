const express = require("express");
const { scrapeLogic } = require("./scrape");
const app = express();

const PORT = process.env.PORT || 1000;

app.get("/scrape", (req, res) => {
  let r = scrapeLogic(res,"roses")
  res.json({response:r})
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
