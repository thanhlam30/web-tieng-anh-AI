const examService = require('./../services/ExamService');
const axios = require('axios');

class ExamController {
    async crawl(req, res, next) {
        const { bookId, examId, name, bookIdDatabase, cookie } = req.query;

        const exam = await examService.crawlExam(examId, bookId, cookie);
        exam.name = name;
        exam.bookId = bookIdDatabase;

        //axios.post('http://localhost:8080/crawl/exams', exam);

        return res.status(200).json(exam);
    }
}

module.exports = new ExamController();
