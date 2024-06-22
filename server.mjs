import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fetchHTML, extractData, extractLinks } from "./crawler.mjs";
import { findOne, insertOne } from "./repos/client.repo.mjs";

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
    await insertOne(data);
    return res.json({ data });
  } else {
    return res.status(500).json({ error: "Failed to fetch the webpage" });
  }
});

app.get("/get-links", async (req, res) => {
  const url = "https://www.companydetails.in/latest-registered-company-mca";
  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  const html = await fetchHTML(url);
  if (html) {
    const data = extractLinks(html);
    return res.json({ links: data });
  } else {
    return res.status(500).json({ error: "Failed to fetch the webpage" });
  }
});

app.get("/clients/:id", async (req, res) => {
  const { id } = req.params;
  const data = await findOne(id);
  if (!data) {
    return res.status(400).json({ error: "Resource Not Found" });
  }
  return res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
