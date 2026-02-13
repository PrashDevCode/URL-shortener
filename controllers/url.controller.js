import shortid from "shortid";
import Url from "../models/url.model.js";

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortId = shortid();
  await Url.create({
    shortUrl: shortId,
    originalUrl: req.body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortUrl: shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

export { handleGenerateNewShortUrl, handleGetAnalytics };
