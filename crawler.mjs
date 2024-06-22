import axios from "axios";
import * as cheerio from "cheerio";
import _ from "lodash";

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
  const attrs = [];
  const rowElements = $(".row");
  rowElements.each((index, element) => {
    const key = _.camelCase(
      $(element).find('a[class*="text-decoration"]').text().trim()
    );
    const value = $(element).find('h6[class*="text-"]').text().trim();
    if (key && value && index != 2) {
      attrs.push([key, value]);
    }
  });
  return Object.fromEntries(attrs);
};

export const startCrawler = async (url) => {
  const html = await fetchHTML(url);
  if (html) {
    const data = extractData(html);
    console.log(data);
  }
};

// startCrawler("http://example.com");
