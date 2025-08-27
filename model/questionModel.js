const { model, Schema } = require("mongoose");

const questionSchema = new Schema({
  question: {
    type: String,
    lowercase: true,
  },
  type: {
    type: String,
    default:"option",
    enum: ["input", "option"],
  },
  option1: {
    type: String,
    required:true,
    trim:true,
    lowercase:true
  },

  option2: {
    type: String,
    required:true,
    trim:true,
    lowercase:true
  },

  option3: {
       type: String,
    required:true,
    trim:true,
    lowercase:true
  },

  option4: {
      type: String,
    required:true,
    trim:true,
    lowercase:true
  },
  answer: {
    type: String,
    trim:true,
    lowercase:true
  },
  note: {
    type: String,
  },
  figure: {
    type: String,
  },
  subject: {
    type: String,
  },
  level: {
    type: String,
    enum: ["low", "mid", "hard"],
  },
},{timestamps:true});

const question = model("Questions",questionSchema)

module.exports = question