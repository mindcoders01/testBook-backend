const mongoose = require("mongoose");
const { createHashedPassword } = require("../utils/passwordManager");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "Image",
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await createHashedPassword(this.password);
    next();
});

module.exports = mongoose.model("Admin", adminSchema);
