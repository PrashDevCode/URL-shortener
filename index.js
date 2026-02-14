import express from "express";
import path from "path";
import urlRoutes from "./routes/url.routes.js";
import connectDB from "./connect.js";
import Url from "./models/url.model.js";
import staticRouter from "./routes/staticRouter.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import restrictToLoggedInUserOnly from "./middlewares/auth.js";

const app = express();
const PORT = 8001;
connectDB("mongodb://localhost:27017/url-shortner")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedInUserOnly, urlRoutes);
app.use("/", userRouter);
app.use("/", staticRouter);

app.get("/:shortId", async (req, res) => {
  try {
    const entry = await Url.findOne({
      shortUrl: req.params.shortId,
    });

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    // analytics tracking
    entry.visitHistory.push({ timestamp: Date.now() });
    await entry.save();

    return res.redirect(entry.originalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
