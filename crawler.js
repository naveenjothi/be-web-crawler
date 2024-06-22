const axios = require("axios");
const cheerio = require("cheerio");

export const fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching HTML for ${url}:`, error);
  }
};

export const extractData = (html) => {
  const $ = cheerio.load(html);
  const data = [];

  $("a").each((index, element) => {
    const link = $(element).attr("href");
    data.push(link);
  });

  return data;
};

export const startCrawler = async (url) => {
  const html = await fetchHTML(url);
  if (html) {
    const data = extractData(html);
    console.log(data);
  }
};

// startCrawler("http://example.com");
