import express from "express";
import urlRoutes from "./routes/url.routes.js";
import connectDB from "./connect.js";
import Url from "./models/url.model.js";

const app = express();
const PORT = 8001;
connectDB("mongodb://localhost:27017/url-shortner")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/url", urlRoutes);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortUrl: shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
  );
  res.redirect(entry.originalUrl);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
