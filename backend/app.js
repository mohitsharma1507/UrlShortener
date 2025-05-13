require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/user");
const urlRoute = require("./routes/url");
const { redirectUrl } = require("./controllers/url");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbUrl = process.env.MONGO_URL;

main()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}
app.get("/:shortCode", redirectUrl);
app.use("/api/user", authRoute);
app.use("/api/urls", urlRoute);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
