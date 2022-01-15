const express = require("express");
const connectDatabase = require("./config/mongodb");
const dotenv = require("dotenv");
const app = express();
const apiQHShop = require("./routes/index");
dotenv.config();
connectDatabase();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use("/api", apiQHShop);

app.listen(port, () => {
  console.log("Server start on port:", port);
});
