const blogService = require("../services/BlogService");
const axios = require("axios");

class BlogController {
  // [GET] /blogs
  async crawlBlogs(req, res, next) {
    const { categoryId, url } = req.query;

    const data = await blogService.getBlogs(url);
    const result = data.map((blogEle) => ({ ...blogEle, categoryId }));

    axios.post("http://localhost:8080/crawl/blogs", result);

    res.json(result);
  }
}

module.exports = new BlogController();
