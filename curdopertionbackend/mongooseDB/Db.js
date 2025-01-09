const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose
  .connect(process.env.MONGOOSE_URL, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log(err));

module.exports = connection;
