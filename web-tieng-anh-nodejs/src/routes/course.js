const express = require("express");
const WordController = require("../app/controllers/CourseController");
const router = express.Router();

router.get("", WordController.crawlCourse);

module.exports = router;
