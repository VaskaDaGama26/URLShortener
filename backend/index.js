const express = require("express");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/router");

const app = express();
const PORT = 8001;

connectToMongoDB(
  "mongodb+srv://admin:admin@cluster0.9xfi1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("Mongodb connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
