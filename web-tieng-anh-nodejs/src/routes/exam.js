const express = require("express");
const ExamController = require("../app/controllers/ExamController");
const router = express.Router();

router.get("", ExamController.crawl);

module.exports = router;
