import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//route for user login
//test in thunderclient - http://localhost:4000/api/user/login, pass json in body
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "This user email is not registered!",
      });
    }

    //if user exists
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

//route for user registration
//test in thunderclient - http://localhost:4000/api/user/register, pass json in body
const registerUser = async (req, res) => {
  //   res.json({ msg: "Register API up" });
  console.log("Request Body:", req.body);

  try {
    const { name, email, password } = req.body;

    //check email exxists or not
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "This user email is already registered!",
      });
    }

    //validate user email and password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    //all valid then hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user and save the details of user to db
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    //
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (e) {
    console.log(e);
    res.json({ success: false, message: e.message });
  }
};

//route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Server misconfiguration: Missing admin credentials",
      });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({ success: true, token });
    }

    res.json({ success: false, message: "Invalid credentials" });
  } catch (e) {
    console.error("Error in adminLogin:", e);
    res.json({ success: false, message: e.message });
  }
};

export { loginUser, registerUser, adminLogin };
