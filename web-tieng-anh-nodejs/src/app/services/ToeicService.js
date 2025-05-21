const axios = require('axios');
const cheerio = require('cheerio');

class ToeicService {
    async crawlToeicTest() {
        const url = 'https://study4.com/tests/2031/practice/?part=6100&part=6101&part=6102&part=6103&part=6104&part=6105&part=6106&time_limit=135';

        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    Cookie: 'sessionid=i9jj4jxiu2in1gounacw19y065rw71cc; cf_clearance=T5xApTt0Dtd49J1mfLv7OWRJRKPUJjVeDlG2Yjrjv_0-1746379239-1.2.1.1-ok2shZUPs5cWmzvgfp4v5dl8.Qs.Df2qvAYFy11xor4YVTa0k1panBekE5oQu5.aCC7Rs86okSPDUBcYDu2r973wLsyocfJkGCHbL8ObYlgQP7Q7IO8.bZxf4bTsqy5krhKSGXAvOIsZyxncFuRYM2gu6CeVGYzRVwzTJIoTkZ4CbPB8DQ.fBlz8dPU45mih.HBFYLjDyEgQJYK2WA6jNie_oX6F2JX2iDX5IxVfHdd08vEKeWCnIv07guxUi1kkdgfBWsNCh9qvJBFagk1iPcia.fpkde1dR2xdzhgfRPRK8Bo_lHn4.Ztq6KChepZE9t2kVcpbA2QP0edFFGvboK3nUmvzvZCgGWM3Q.N4XeU; csrftoken=9SHIfRCzkqQ5Q0xEekfv3l71JcKHVGlX8SPhMJ2H2oytz3YzT1Bx4e1rIIknwFJl'
                }
            });

            const html = response.data;
            const $ = cheerio.load(html);

            const questions = [];
            const parts = [];           

            $('[id^="partcontent-"]').each((_, partElem) => {
                const $part = $(partElem);

                $part.find('.question-item-wrapper').each((__, qElem) => {
                    const $q = $(qElem);

                    const questionNumber = $q.find('.question-number strong').text().trim();
                    const questionText = $q.find('.question-text').text().trim();

                    const audioUrl = $q.find('audio source').attr('src') || $q.find('audio').attr('src') || null;
                    const imageUrl = $q.find('.context-content img').attr('data-src') || $q.find('.context-content img').attr('src') || null;

                    const answers = [];
                    $q.find('.form-check-label').each((_, ansElem) => {
                        answers.push($(ansElem).text().trim());
                    });

                    questions.push({
                        questionNumber,
                        questionText,
                        answers,
                        imageUrl,
                        audioUrl
                    });
                });
            });

            return questions;
        } catch (error) {
            console.error("Error fetching TOEIC test data:", error);
        }
    }
}

module.exports = new ToeicService();