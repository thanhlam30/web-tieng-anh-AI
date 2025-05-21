const wordRouter = require("./word");
const courseRouter = require("./course");
const examRouter = require("./exam");
const videoRouter = require("./video");
const blogRouter = require("./blog");
const toeicRouter = require("./toeic");

const route = (app) => {
    app.use("/words", wordRouter);
    app.use("/courses", courseRouter);
    app.use("/exams", examRouter);
    app.use("/videos", videoRouter);
    app.use("/blogs", blogRouter);
    app.use("/toeic", toeicRouter);
};

module.exports = route;
