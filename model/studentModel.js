const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      lowercase: true,
    },
    study: {
      type: String,
    },
    profile: {
      type: String,
    },
    referralCode: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },
    attempts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestPaperCollection",
      },
    ],
  },
  { timestamps: true }
);

//pre middleware
studentSchema.pre('save',async function(next){
    if(!this.isModified('password')) return  next();
    try{
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(err){
        next(err);
    }
});

// Instance method -> password compare(for login)
studentSchema.methods.comparePassword = async function(enteredPassword){
  //  console.log("yahdh ",this.password)
    return await bcrypt.compare(enteredPassword,this.password);
}


const student = mongoose.model("student", studentSchema);
module.exports = student;
