import axios from "axios";
import dotenv from "dotenv";

const sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

dotenv.config();

const serverURL = `http://localhost:${process.env.APP_PORT}`;

const bootstrap = async () => {
  const resp = await axios.get(`${serverURL}/get-links`);
  const allLinks = resp?.data?.links || [];
  const failedLinks = [];
  for (let index = 0; index < allLinks.length; index++) {
    if ((index + 1) % 50 == 0) {
      await sleep(2000);
    }
    const link = allLinks[index];
    const crawledResp = await axios.get(`${serverURL}/crawl?url=${link}`);
    try {
      console.log("Processing link", index, link);
      const payload = crawledResp.data.data;
      await axios.post(`${serverURL}/clients`, { input: payload });
    } catch (error) {
      console.error("Error migrating", error?.message);
      failedLinks.push(link);
    }
  }
  console.log(
    `Total links crawled ${allLinks.length}, failed ${failedLinks.length}`
  );
  console.log(failedLinks);
};
bootstrap();
