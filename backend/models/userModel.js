const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, //password is a string of characters and numbers

    minlength: 6, // minlength: [6,"Password must be at least six charaters long"]
    required: true,
  },
});
// static signup method
// here we used this so we cant use arrow function so use normal function
// userSchema.statics.signup = async (email, password) => {
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All the field must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough ");
  }
  //  check if the email is already on database

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email alread in use");
  }
  //   bcrypt is used for the hashing and encrytion

  const salt = await bcrypt.genSalt(10);
  //   console.log("salt", salt);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All the field must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email ");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw Error("invalid user Crendential");
  }

  return user;
};

module.exports = mongoose.model("user", userSchema);
