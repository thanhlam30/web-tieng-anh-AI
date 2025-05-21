const cheerio = require("cheerio");
const request = require("request-promise");

const BASE_URL = "https://toeicexamstore.com";

class BlogService {
  async getBlogs(url) {
    let result = [];

    await request(url, (err, res, html) => {
      const $ = cheerio.load(html);

      $(".col-md-3").each((index, blogEle) => {
        const blog = {};

        blog.name = $(blogEle).find("h3").text().trim();
        blog.image = `${BASE_URL}/${$(blogEle).find("img").attr("src").trim()}`;
        blog.description = $(blogEle)
          .find(".post-text p")
          .text()
          .trim()
          .replace("Đọc bài này", "");
        blog.url = $(blogEle).find(".readmore").attr("href");

        result.push(blog);
      });
    });

    for (const blog of result) {
      const { url } = blog;

      try {
        await request(url, (err, res, html) => {
          try {
            let $ = cheerio.load(html);

            blog.content = $(".blog-content").remove(".pt-5").html().trim();
          } catch (error) {
            console.log("err: ", url);
          }
        });
      } catch (error) {
        console.log("err: ", url);
      }
    }

    return result.filter((blogEle) => blogEle.content);
  }
}

module.exports = new BlogService();
