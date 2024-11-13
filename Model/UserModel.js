const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  Mobile: {
    type: Number,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  email: {
    type: String,
    required: [true, "Please tell ua your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Enter a valid email"],
  },
  College: {
    type: String,
    required: true,
  },
  changedPasswordAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  Resume:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Resume"
  }]
});

userSchema.pre("save", async function (next) {
    if(!this.isModified('Password')) return next();
  this.Password = await bcrypt.hash(this.Password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
