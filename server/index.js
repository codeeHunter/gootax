require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware);

const appStart = async () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

appStart();
