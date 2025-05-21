const videoService = require('../services/VideoService');
const fs = require('fs');
const readline = require('readline');
const axios = require('axios');

const BASE_URL = 'https://ejoy-english.com';

// /videos
class VideoController {
    // [GET] /crawl
    async crawlVideo(req, res, next) {
        const { url, categoryId } = req.query;

        const data = await videoService.crawlVideo(url, categoryId);
        console.log('data: ', data);

        axios.post('http://localhost:8080/crawl/videos', data);

        res.json(data);
    }

    async readUrl(req, res, next) {
        const { categoryId } = req.params;

        var rd = readline.createInterface({
            input: fs.createReadStream(
                `${process.env.URL_FOLDER}/${categoryId}.txt`
            ),
        });

        rd.on('line', function (line) {
            console.log('url: ', line);
            videoService.crawlAndPostData(line, categoryId);
        });

        res.json({ name: 'thanh cong' });
    }

    async writeUrl(req, res, next) {
        const { url, categoryId } = req.query;

        const crawlUrl = `${BASE_URL}${url}`;

        fs.appendFile(
            `${process.env.URL_FOLDER}/${categoryId}.txt`,
            '\n' + crawlUrl,
            function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log('The file was saved!');
            }
        );

        res.status(200).json({ message: 'Thanh cong' });
    }
}

module.exports = new VideoController();
