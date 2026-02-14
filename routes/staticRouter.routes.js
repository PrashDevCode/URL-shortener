import express from "express";
import Url from "../models/url.model.js";
import shortid from "shortid";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    shortUrl: null,
    baseUrl: process.env.BASE_URL || "http://localhost:8001",
  });
});

router.post("/shorten", async (req, res) => {
  try {
    console.log("POST /shorten hit");

    const { fullUrl } = req.body;
    console.log("URL received:", fullUrl);

    if (!fullUrl) {
      return res.status(400).send("URL is required");
    }

    const shortId = shortid.generate();

    await Url.create({
      shortUrl: shortId,
      originalUrl: fullUrl,
    });

    return res.render("home", {
      shortUrl: shortId,
      baseUrl: process.env.BASE_URL || "http://localhost:8001",
    });
  } catch (err) {
    console.error("Shorten error:", err);
    return res.status(500).send("Server Error");
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

export default router;
