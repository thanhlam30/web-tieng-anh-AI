const toeicService = require('./../services/ToeicService');

class ToeicController {
    async crawl(req, res, next) {
        try {
            const data = await toeicService.crawlToeicTest();
            // data.forEach((part, index) => {
            //     console.log(`Part ${index + 1}: ${part.partName}`);
            //     console.log('Questions:');
            //     part.questions.forEach((question, qIndex) => {
            //         console.log(`  Question ${qIndex + 1}: ${question.questionText}`);
            //     });
            // });
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error in ToeicController:', error);
            return res.status(500).json({ message: 'Failed to crawl Toeic test' });
        }
    }
}

module.exports = new ToeicController();