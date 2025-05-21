const cheerio = require("cheerio");
const request = require("request-promise");
const axios = require("axios");
const { isTypeSubTypeOf } = require("graphql");

const BASE_URL = "https://cdn.ejoy.io";

class VideoService {
  async crawlAndPostData(url, categoryId) {
    const data = await this.crawlVideo(url, categoryId);

    if (data) axios.post("http://localhost:8080/crawl/videos", data);
  }

  async crawlVideo(url, categoryId) {
    try {
      let result;

      await request(url, (err, response, html) => {
        try {
          const $ = cheerio.load(html);

          const object = JSON.parse($("#__NEXT_DATA__").html());

          console.log("url fetch: ", url);
          const data =
            object.props.pageProps.initialState.data.clips.clipDetail;

          const {
            title,
            backdrop,
            difficulty,
            duration,
            description,
            dialogLines,
            video,
          } = data;

          const subtitles = dialogLines.map((sub) => {
            const { cueStart, cueEnd, seq, transcript } = sub;

            return {
              stt: seq,
              content: transcript,
              start: cueStart,
              end: cueEnd,
            };
          });

          const videoData = {
            name: title,
            image: `${BASE_URL}/${backdrop}`,
            description,
            duration,
            level: difficulty,
            subtitles,
            url: video.uri,
            categoryId,
          };

          result = videoData;
        } catch (error) {
          result = null;
        }
      });

      const urlTempt = url.split("/");
      const videoId = urlTempt[urlTempt.length - 1];
      console.log("videoId: ", videoId);

      const videoWordData = await axios.get(
        `https://dics.ejoyspace.com/vocab/getWordsInfo?clipId=${videoId}`
      );

      const videoWords = [];

      for (const wordVideo of videoWordData.data) {
        videoWords.push(await this.getVideoWord(wordVideo));
      }

      result.videoWords = videoWords;

      return result;
    } catch (error) {
      return null;
    }
  }

  async getVideoWord(videoWord) {
    const { word, origin, frequency } = videoWord;
    const usFetchResult = await axios.get(
      `https://dict.laban.vn/ajax/getsound?accent=us&word=${origin}`
    );

    let sound = "";

    const { data } = usFetchResult.data;

    if (data) {
      sound = data;
    } else {
      const ukFetchResult = await axios.get(
        `https://dict.laban.vn/ajax/getsound?accent=uk&word=${origin}`
      );

      sound = ukFetchResult.data.data;
    }

    return {
      name: word,
      origin,
      frequency,
      sound,
    };
  }
}

module.exports = new VideoService();
