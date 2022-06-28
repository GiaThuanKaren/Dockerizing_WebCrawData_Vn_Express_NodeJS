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
      let arr = [];
      // $('.owl-item').each((index, el) => { // lặp từng phần tử có class là job__list-item
      //   // const job = $(el).find('.job__list-item-title a').text(); // lấy tên job, được nằm trong thẻ a < .job__list-item-title

      //   console.log(123);
      // })
      $(".col-left article").each((index, el) => {
        // lặp từng phần tử có class là job__list-item
        const tittle = $(el).find("h3 a").text();
        const linkdetail = $(el).find("h3 a").attr("href");
        const des = $(el).find(".description a ").text();
        const picture = $(el).find("picture source").attr("srcset");
        // console.log(linkdetail);
        const obj = {
          tittle,
          des,
          linkdetail,
        };
        arr.push(obj);
      });
      // console.log(arr);
      res.json(arr);
      return;
    } else {
      console.log(error);
      // res.json(error)
    }
  });
});

app.get("/catologe", (req, res) => {
  request("https://vnexpress.net/", (err, response, html) => {
    if (!err && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let i=0,arr=[];
      const header = $('.main-nav li').each((index,ele)=>{
        const id = $(ele).attr("data-id");
        const className =$(ele).find("a");
        const href = className.attr("href")
        const tittleCatologe = $(ele).text();
        console.log(href)
        arr =[...arr,{
          id:id ? id: "",
          name:tittleCatologe.replace(/\s/g,''),
          link:href
        }]
        // const tittle = $(el).text()
        i++;
      })
      res.json(arr)
      // console.log(i)
    } else {
      console.log(err);
      res.json(err);
    }
  });
});

app.get("/query",async (req,res)=>{
  const {search }=req.query
  console.log(req.query )
  // let getrespone=await fetch('http://localhost:5000/catologe');
  // let catologeArr= await getrespone.json();
  // console.log(catologeArr)

  res.send("hiu")
})


app.listen(PORT, () => {
  console.log("Listenning port " + PORT);
});
