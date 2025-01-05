const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./module/product/product.route");
dotenv.config();
const port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// https://grocery-store-frontend-two.vercel.app
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);


let { DB_USER, DB_PASS } = process.env;
let url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.nhg2oh1.mongodb.net/grocery-gateway?retryWrites=true&w=majority&appName=Cluster0`;

const database = "grocery-gateway";
mongoose
  .connect(url, { dbName: database })
  .then(() => {
    console.log("Connected to database!");
})
  .catch((error) => {
    console.log("Connection failed!", error);
    process.exit();
});

app.use("/api/v1", router);
// app.post("/product", async (req, res) => {
  
// });

// app.get("/product", async (req, res) => {
  
// });

app.get("/", (req, res) => {
  res.send("Contest is running!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});