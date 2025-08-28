const { Schema, model } = require("mongoose");

const paperSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    question: [
      {
        type: Schema.Types.ObjectId,
        ref: "Questions",
      },
    ],
    exam: { type: String, trim: true },
    figure: { type: String, trim: true },
    note: { type: String, trim: true },
    duration: { type: Number, required: true },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Paper", paperSchema);
