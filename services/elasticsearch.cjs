const elasticsearch = require("elasticsearch");
const dotenv = require("dotenv");

dotenv.config();

const elasticURL = process.env.BONSAI_URL;

var client = new elasticsearch.Client({
  host: elasticURL,
});

module.exports = client;
