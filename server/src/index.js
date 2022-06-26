const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 5000;
const cheerio = require("cheerio"); // khai báo module cheerio

const request = require("request-promise");

app.get("/", (req, res) => {
  request("https://vnexpress.net/", (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html); // load HTML
        let arr=[];
      $(".col-left article").each((index, el) => {
        // lặp từng phần tử có class là job__list-item
        const tittle = $(el).find("h3 a").text();
        const linkdetail = $(el).find("h3 a").attr("href");
        const des = $(el).find(".description a ").text();
        const picture = $(el).find("picture source").attr("srcset");
        // console.log(linkdetail);
        const obj={
            tittle,
            des,
            linkdetail
        }
        arr.push(obj);
        
      });
    //   console.log(arr)
      res.json(arr)
      return 
    } else {
      console.log(error);
      res.sendStatus(404).json(error)
    }
  });
});

app.listen(PORT, () => {
  console.log("Listenning port " + PORT);
});
