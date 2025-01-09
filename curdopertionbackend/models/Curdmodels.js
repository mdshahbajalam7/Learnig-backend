const { Schema, model } = require("mongoose");

const USERFORMSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "explorer", "gs"],
    required: true,
  },
  language: {
    type: String,
    emum: ["english", "hindi", "urdu", "gujarati"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const USERFORMMOdels = model("userform", USERFORMSchema);

module.exports = USERFORMMOdels;
