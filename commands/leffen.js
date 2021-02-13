const fs = require("fs");
const Path = require("path");
const { Builder, By, until, } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");

const screen = {
  width: 1200,
  height: 800
};

const randomString = () => {
  return Buffer.from(Math.random().toString(36)).toString("base64");
}

const createBrowser = async () => {
  return new Builder().forBrowser("chrome")
    .setChromeOptions((new Options()).headless().windowSize(screen))
    .build();
}

const tweetGetData = async (tweetElement) => {
  let screenshotString = await tweetElement.takeScreenshot(true);
  return Buffer.from(screenshotString, "base64");
}

const lastLeffen = async () => {
  const browser = await createBrowser();

  await browser.get("https://twitter.com/deepleffen?lang=enm");

  await browser.wait(until.elementLocated(By.css("main section article div")), 5000);
  await browser.executeScript(`document.getElementById("layers").remove()`);

  const elements = await browser.findElements(By.css("main section article"));
  elements.pop();
  const image = await tweetGetData(elements[1]);
  const imageName = Path.join("images", `AUTO_${randomString()}.png`);
  fs.writeFileSync(imageName, image);
  await browser.close();
  return imageName;
};

module.exports = {
    name: 'leffen',
    description: 'Posts the last tweet from Deep Leffen',
    
    execute(message, _args) {
      console.log("execute command");
      lastLeffen().then(file => {
        console.log(file);
        message.channel.send('Latest Leffen Tweet:', {
            files: [
                file
            ]
        });
      });
    }
}

