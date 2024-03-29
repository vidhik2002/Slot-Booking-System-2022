const express = require("express");

const app = express();
const rateLimit = require("express-rate-limit");
const cors = require("cors");

require("dotenv/config");
require("./models/dbInit");

app.use(cors());
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// const authMiddleware = require("./middleware/authorize");

const testRoute = require("./routes/test");
app.use("/test", testRoute);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(3001, () => {
  console.log("server started");
});
