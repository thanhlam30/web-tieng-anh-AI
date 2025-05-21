const wordService = require("../services/WordService");
const slug = require("slug");

slug.charmap["-"] = "-";

// /words
class WordController {
  // [Get]
  async getByName(req, res, next) {
    const { name } = req.params;

    const word = await wordService.getByName(slug(name, "_"));

    if (!word) {
      res.status(400).json({ status: "400", error: "Không tìm thấy" });
      return;
    }

    res.status(200).json(word);
  }
}

module.exports = new WordController();
