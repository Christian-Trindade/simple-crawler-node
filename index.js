const puppeteer = require("puppeteer");

const url =
  "https://www.meritocomercial.com.br/bomba-monoestagio-fsg-v-famac-1-12-x-1-12-118mm-3cv-monofasica-220440v-com-motor-nova-4001001006615-p1030285?v=1030286";

async function startCrawler(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const pageData = await page.evaluate(() => {
    const dimensions = document.querySelectorAll(".dimension");
    const data = {};

    dimensions.forEach((item) => {
      const label = item.querySelector("span").innerHTML;
      const value = item.querySelector("strong").innerHTML;
      data[label] = value;
    });

    return data;
  });

  console.log("data", pageData);

  await browser.close();
}

startCrawler(url);
