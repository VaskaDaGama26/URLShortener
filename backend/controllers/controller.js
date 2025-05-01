const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const existingEntry = await URL.findOne({ redirectURL: body.url });
    if (existingEntry) {
      return res.json({ id: existingEntry.shortId });
    }

    const shortID = shortid();
    console.log("Generated shortID:", shortID);

    const newEntry = await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ id: newEntry.shortId });
  } catch (err) {
    console.error("Error creating short URL:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenerateNewShortURL, handleGetAnalytics };
