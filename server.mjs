import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fetchHTML, extractData } from "./crawler.mjs";

const app = express();
const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;

app.get("/crawl", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  const html = await fetchHTML(url);
  if (html) {
    const data = extractData(html);
    return res.json({ links: data });
  } else {
    return res.status(500).json({ error: "Failed to fetch the webpage" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
