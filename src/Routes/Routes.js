module.exports = function Routes(app) {
  app.use("/", (req, res) => {
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
};
