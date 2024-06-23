import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const serverURL = `http://localhost:${process.env.APP_PORT}`;

const bootstrap = async () => {
  const resp = await axios.get(`${serverURL}/get-links`);
  const allLinks = resp?.data?.links || [];
  const failedLinks = [];
  for (let index = 0; index < allLinks.length; index++) {
    const link = allLinks[index];
    const crawledResp = await axios.get(`${serverURL}/crawl?url=${link}`);
    try {
      console.log("Processing link", index, link);
      const input = crawledResp.data.data;
      await axios.post(`${serverURL}/clients`, input);
    } catch (error) {
      console.error(error.message);
      failedLinks.push(link);
    }
  }
  console.log(
    `Total links crawled ${allLinks.length}, failed ${failedLinks.length}`
  );
  console.log(failedLinks);
};
bootstrap();
