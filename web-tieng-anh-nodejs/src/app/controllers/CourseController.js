const CourseService = require("../services/CourseService");
const axios = require("axios");
// courses
class CourseController {
  // [GET]
  async crawlCourse(req, res, next) {
    const { url, topicId, type } = req.query;
    const course = await CourseService.crawlWord(url, type);
    course.topicId = topicId;
    axios.post(
      `http://localhost:8080/crawl/courses?topicId=${topicId}`,
      course
    );
    if (!course) res.status(400).json({ status: "400", error: "Lỗi" });
    res.status(200).json(course);
  }
}

module.exports = new CourseController();
