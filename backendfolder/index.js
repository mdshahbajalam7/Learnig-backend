const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connection =  require("./MongooseDb/Db")
// import connected from './MongooseDb/Db'
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Full-Stack MERN Projects");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connection;
  console.log(`db connection`);
  console.log(`Server Start http://localhost:${PORT}`);
});
