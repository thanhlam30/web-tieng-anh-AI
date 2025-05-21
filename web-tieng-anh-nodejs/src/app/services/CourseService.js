const cheerio = require("cheerio");
const request = require("request-promise");
const { GraphQLClient, gql } = require("graphql-request");
const axios = require("axios");

const slug = require("slug");

slug.charmap["-"] = "-";

const ENDPOINT = "https://api.ejoy.io/graph";
const query = gql`
  query getWordsByTopic($wordSetId: String!, $topicId: String, $lang: String) {
    getWordsByTopic(wordSetId: $wordSetId, topicId: $topicId, lang: $lang) {
      id
      orthography
      pronunciation
      image
      definition
      example
      POS
      audio
      example

      translation {
        lang
        trans
      }
    }
  }
`;
const variables = {
  lang: "vi",
};

const client = new GraphQLClient(ENDPOINT, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODIzNDYiLCJzc29JZCI6MTY4MjM0Niwic3NvVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZNVFk0TWpNME5pd2lhV0YwSWpveE56UTJNVEV5TnpZM0xDSmxlSEFpT2pFM05EZzNNRFEzTmpkOS4ybHVfaktMbTZrUlNKdzlYUFVXVlJDQTFleVdfbk9pcjk4alNyR3JrZWVZIiwiaWF0IjoxNzQ2MTEyNzcwLCJleHAiOjE3NTEyOTY3NzB9.bnMtLB0c1JunKw4_NLAITrtxmnDOoq3lMkmXanomQvY",
  },
});

class WordService {
  async crawlWord(url, type) {
    const result = {};
    let wordSetId = 0;
    const topicIds = [];

    await request(url, (err, res, html) => {
      const $ = cheerio.load(html);

      // lấy tên khóa học
      const name = $("h1").text();
      result.name = name;
      // mo ta
      $("h2").each((index, ele) => {
        if (index == 0) {
          result.description = $(ele).text();
        }
      });
      // get anh
      $(".cover-header").each((index, ele) => {
        if (index == 0) {
          const imageString = $(ele).css("background-image");
          result.image = imageString.slice(5, imageString.length - 2);
        }
      });

      $("#tab-holder")
        .find(".tab-item")
        .each((index, tabEl) => topicIds.push($(tabEl).attr("value")));

      const urlContents = url.split("/");
      wordSetId = urlContents[urlContents.length - 1];
    });

    result.size = 0;
    result.words = [];

    variables.wordSetId = wordSetId;

    for (const topicIdEle of topicIds) {
      variables.topicId = topicIdEle;
      const data = await client.request(query, variables);
      const words = data.getWordsByTopic;

      words.forEach((wordEl) => {
        const {
          orthography,
          pronunciation,
          image,
          definition,
          example,
          POS,
          audio = "",
          translation,
        } = wordEl;

        let mean = "";
        if (translation) mean = translation.trans;

        result.words.push({
          name: orthography,
          type: POS,
          mean,
          pronounce: pronunciation,
          sound: audio,
          definition,
          example,
          image: `https://cdn.ejoy.io/${image}`,
        });
      });
    }

    for (const wordEle of result.words) {
      const usFetchResult = await axios.get(
        `https://dict.laban.vn/ajax/getsound?accent=us&word=${slug(
          wordEle.name,
          "+"
        )}`
      );

      const { data } = usFetchResult.data;
      wordEle.sound = data ? data : "";
    }

    result.size = result.words.length;

    return result;
  }
}

module.exports = new WordService();
