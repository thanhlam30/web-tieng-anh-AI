const express = require("express");
const WordController = require("../app/controllers/WordController");
const router = express.Router();

router.get("/:name", WordController.getByName);

module.exports = router;
