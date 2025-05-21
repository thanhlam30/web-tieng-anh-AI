const express = require('express');
const router = express.Router();
const toeicController = require('../app/controllers/ToeicController');

router.get('/crawl', toeicController.crawl);

module.exports = router;
