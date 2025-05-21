const cheerio = require("cheerio");
const request = require("request-promise").defaults({ jar: true });
const request1 = require("request-promise");

const options = {
  method: "GET",
};

const KEY = ["a", "b", "c", "d"];

const URL_BASE = "https://toeicexamstore.xyz";

const createUrl = (part, examId, bookId) => {
  return `https://toeicexamstore.xyz/toeictest/fulltest/part${part}/${bookId}/${examId}`;
};

class ExamService {
  async crawlExam(examId, bookId, cookie) {
    options.headers = {
      cookie,
    };
    let result = {};

    try {
      result.part1 = await this.crawlPart1(examId, bookId);
      result.part2 = await this.crawlPart2(examId, bookId);
      result.part3 = await this.crawlPart3_4(examId, bookId, 3);
      result.part4 = await this.crawlPart3_4(examId, bookId, 4);
      result.part5 = await this.crawlPart5(examId, bookId);
      result.part6 = await this.crawlPart6(examId, bookId);
      result.part7 = await this.crawlPart7(examId, bookId);

      result.part1audio = await this.crawlAudioPart1(1, examId, bookId);
      result.part2audio = await this.crawlAudioPart1(2, examId, bookId);
    } catch (e) {
      console.log("error: ", e);
    }

    return result;
  }

  async crawlAudioPart1(part, examId, bookId) {
    let result = "";
    const url = createUrl(part, examId, bookId);

    await request1(url, (err, response, html) => {
      const $ = cheerio.load(html);
      result = `${URL_BASE}/` + $("source").attr("src");
    });

    return result;
  }

  async crawlPart1(examId, bookId) {
    const url = createUrl(1, examId, bookId);
    options.uri = url;

    const result = [];

    // load html
    try {
      const res = await request(options);
      const $ = cheerio.load(res);

      $("#question-5").each((index, ele) => {
        const question = {};

        question.stt = index + 1;
        question.content = `${URL_BASE}/` + $(ele).find("img").attr("src");
        question.audio = `${URL_BASE}/` + $(ele).find("source").attr("src");

        // lấy đáp án
        $(ele)
          .find("li")
          .each((index, answeEle) => {
            const content = $(answeEle).find("label").text().trim();
            const isCorrect = $(answeEle).find(".fa-check").attr("class")
              ? true
              : false;
            if (index == 0) question.a = content;

            if (index == 1) question.b = content;

            if (index == 2) question.c = content;

            if (index == 3) question.d = content;

            if (isCorrect) question.result = KEY[index];
          });

        result.push(question);
      });

      return result;
    } catch (error) {
      console.log("e: ", error);
    }
  }

  async crawlPart2(examId, bookId) {
    const url = createUrl(2, examId, bookId);
    options.uri = url;

    const result = [];

    // load html
    try {
      const res = await request(options);
      const $ = cheerio.load(res);

      $("#question-1031").each((index, ele) => {
        const question = {};

        question.stt = index + 1 + 6;
        question.content = $(ele).find("b").text().trim();
        question.audio = `${URL_BASE}/` + $(ele).find("source").attr("src");

        // lấy đáp án
        $(ele)
          .find("li")
          .each((index, answeEle) => {
            const content = $(answeEle).find("label").text().trim();
            const isCorrect = $(answeEle).find(".fa-check").attr("class")
              ? true
              : false;
            if (index == 0) question.a = content;

            if (index == 1) question.b = content;

            if (index == 2) question.c = content;

            if (index == 3) question.d = content;

            if (isCorrect) question.result = KEY[index];
          });

        result.push(question);
      });

      return result;
    } catch (error) {
      return {};
    }
  }

  async crawlPart3_4(examId, bookId, partType = 3) {
    const result = [];

    let i = partType == 3 ? 32 : 71;
    let end = partType === 3 ? 68 : 98;

    for (i; i <= end; i = i + 3) {
      try {
        const questionGroup = {};

        const url = createUrl(partType, examId, bookId) + "/" + i;
        options.uri = url;

        const res = await request(options);
        const $ = cheerio.load(res);

        // get audio
        questionGroup.paragraph = `${URL_BASE}/` + $("source").attr("src");

        // get transcript
        questionGroup.transcript = "";
        $(".text-justify").each((index, ele) => {
          if (index == 1) questionGroup.transcript = $(ele).html().trim();
        });

        // get questions
        questionGroup.questions = [];
        $("#question-1056").each((index, ele) => {
          const question = {};

          question.stt = i + index;
          question.content = $(ele).find("p").text().trim();

          // lấy đáp án
          $(ele)
            .find("li")
            .each((index, answeEle) => {
              const content = $(answeEle).find("label").text().trim();
              const isCorrect = $(answeEle).find(".fa-check").attr("class")
                ? true
                : false;
              if (index == 0) question.a = content;

              if (index == 1) question.b = content;

              if (index == 2) question.c = content;

              if (index == 3) question.d = content;

              if (isCorrect) question.result = KEY[index];
            });

          questionGroup.questions.push(question);
        });

        result.push(questionGroup);
      } catch (error) {
        console.log("e: ", error);
      }
    }

    return result;
  }

  async crawlPart5(examId, bookId) {
    const result = [];

    const url = createUrl(5, examId, bookId);
    options.uri = url;
    const res = await request(options);
    const $ = cheerio.load(res);
    $("#question-1125").each((index, ele) => {
      const question = {};

      question.stt = 101 + index;
      question.content = $(ele).find("p").text().trim();

      // lấy đáp án
      $(ele)
        .find("li")
        .each((index, answeEle) => {
          const content = $(answeEle).find("label").text().trim();
          const isCorrect = $(answeEle).find(".fa-check").attr("class")
            ? true
            : false;
          if (index == 0) question.a = content;

          if (index == 1) question.b = content;

          if (index == 2) question.c = content;

          if (index == 3) question.d = content;

          if (isCorrect) question.result = KEY[index];
        });

      result.push(question);
    });

    return result;
  }

  async crawlPart6(examId, bookId) {
    const result = [];

    for (let i = 131; i <= 143; i = i + 4) {
      try {
        const questionGroup = {};

        const url = createUrl(6, examId, bookId) + "/" + i;
        options.uri = url;

        const res = await request(options);
        const $ = cheerio.load(res);

        // get paragrap
        questionGroup.paragraph = "";
        $(".question-content")
          .find(" > p")
          .each((index, ele) => {
            if (index != 0) {
              questionGroup.paragraph += `<p> ${$(ele).html().trim()} </p>`;
            }
          });

        // get questions
        questionGroup.questions = [];
        $("#question-1155").each((index, ele) => {
          const question = {};

          question.stt = i + index;
          question.content = $(ele).find("p").text().trim();

          // lấy đáp án
          $(ele)
            .find("li")
            .each((index, answeEle) => {
              const content = $(answeEle).find("label").text().trim();
              const isCorrect = $(answeEle).find(".fa-check").attr("class")
                ? true
                : false;
              if (index == 0) question.a = content;

              if (index == 1) question.b = content;

              if (index == 2) question.c = content;

              if (index == 3) question.d = content;

              if (isCorrect) question.result = KEY[index];
            });

          questionGroup.questions.push(question);
        });

        result.push(questionGroup);
      } catch (error) {
        console.log("e: ", error);
      }
    }

    return result;
  }

  async crawlPart7(examId, bookId) {
    const result = [];

    let crawlStt = 147;
    let tempt = true;
    while (tempt) {
      let url = createUrl(7, examId, bookId) + "/" + crawlStt;

      options.uri = url;
      const res = await request(options);
      const $ = cheerio.load(res);
      const splitTempt = `${URL_BASE}/${$(".mc-btn").attr("href")}`.split("/");

      console.log("url: ", url);

      const questionGroup = {};
      questionGroup.paragraph = "";
      $(".question-content")
        .children()
        .each((index, ele) => {
          if (
            $(ele).is("div") ||
            $(ele).is("a") ||
            $(ele).is("input") ||
            $(ele).is("p.text-justify")
          )
            return;

          questionGroup.paragraph += $.html(ele);
        });

      // get question

      questionGroup.questions = [];
      $("#question-1205").each((index, ele) => {
        const question = {};
        question.stt = parseInt(crawlStt) + index;
        question.content = $(ele).find("p").text().trim();

        // lấy đáp án
        $(ele)
          .find("li")
          .each((index, answeEle) => {
            const content = $(answeEle).find("label").text().trim();
            const isCorrect = $(answeEle).find(".fa-check").attr("class")
              ? true
              : false;

            if (index == 0) question.a = content;

            if (index == 1) question.b = content;

            if (index == 2) question.c = content;

            if (index == 3) question.d = content;

            if (isCorrect) question.result = KEY[index];
          });

        questionGroup.questions.push(question);
      });

      result.push(questionGroup);

      if (splitTempt.findIndex((s) => s === "result") !== -1) tempt = false;

      crawlStt = splitTempt[splitTempt.length - 2];
    }

    return result;
  }
}

module.exports = new ExamService();
