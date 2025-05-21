const express = require('express');
const videoController = require('../app/controllers/VideoController');
const router = express.Router();

router.get('/crawl', videoController.crawlVideo);
router.get('/write-url', videoController.writeUrl);
router.get('/crawl-data/:categoryId', videoController.readUrl);

module.exports = router;
