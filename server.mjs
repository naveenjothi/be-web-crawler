import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fetchHTML, extractData, extractLinks } from "./services/crawler.mjs";
import {
  findOne,
  insertOne,
  updateOne,
  indexDocument,
  searchDocuments,
  createIndex,
} from "./repos/client.repo.mjs";
import { clientMappings } from "./es-mappings/client.mapping.mjs";

const app = express();
const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;
const esIndexName = "clients";

const initializeElasticsearch = async () => {
  await createIndex(esIndexName, clientMappings);
};

initializeElasticsearch().catch(console.error);

app.use(express.json());

app.get("/crawl", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }
  const html = await fetchHTML(url);
  if (html) {
    const data = extractData(html);
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

  try {
    const html = await fetchHTML(url);
    if (html) {
      const data = extractLinks(html);
      return res.json({ links: data });
    } else {
      return res.status(500).json({ error: "Failed to fetch the webpage" });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
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

app.post("/clients", async (req, res) => {
  const input = req.body;

  if (!input?.cin || !input?.pinCode || !input?.companyName) {
    return res
      .status(400)
      .json({ error: "CIN, PIN Code and companyName are required" });
  }

  if (input?.cin.length !== 21) {
    return res.status(400).json({ error: "Not a valid CIN number" });
  }

  if (input?.pinCode.length !== 6) {
    return res.status(400).json({ error: "Not a valid PIN Code number" });
  }

  try {
    const insertedId = await insertOne(input);
    indexDocument("clients", insertedId, input);
    return res.status(201).json({
      data: {
        ...input,
        id: insertedId,
      },
    });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
});

app.post("/clients/:id", async (req, res) => {
  const input = req.body.input;
  const id = req.params.id;

  if (input?.pinCode?.length !== 6) {
    return res.status(400).json({ error: "Not a valid PIN Code number" });
  }
  const exists = await findOne(id);
  if (!exists) {
    return res.status(404).json({ error: "Document Doesnot exists" });
  }

  try {
    await updateOne(id, input);

    return res
      .status(201)
      .json({ status: "success", message: "Record updated successfully." });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
});

app.delete("/clients/:id", async (req, res) => {
  const id = req.params.id;
  const exists = await findOne(id);
  if (!exists) {
    return res.status(404).json({ error: "Document Doesnot exists" });
  }

  try {
    await updateOne(id, { isDeleted: true });

    return res
      .status(201)
      .json({ status: "success", message: "Record deleted successfully." });
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
});

app.get("/clients", async (req, res) => {
  const query = req.query?.q || "";

  const results = await searchDocuments(esIndexName, query);

  return res.json(results);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
