const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const userForm = require("./Router/curd");
// db connection

const mongooseDBconnection = require("./mongooseDB/Db");

// db connection endpoint

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/start", (req, res) => {
  res.send("This Backend Basic For Curd Opertion");
});

app.use("/", userForm);

const PORT_Number = process.env.PORT || 8080;

app.listen(PORT_Number, async () => {
  await mongooseDBconnection;
  // console.log(`Listening on ${mongooseDBconnection}`);
  console.log(`Server Start http://localhost:${PORT_Number}`);
});
