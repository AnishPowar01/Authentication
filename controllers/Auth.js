const user = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

//  signup

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already exists

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    let hashedPassword;

    // secure password
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error in hashing Password",
      });
    }

    // create entry for user

    const User = await user.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({
      success: false,
      message: "User cannot register ",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation on email

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All Field",
      });
    }

    // check if user is availabe or not

    let User = await user.findOne({ email });

    if (!User) {
      return res.status(400).json({
        success: false,
        message: "No user with this email id",
      });
    }

    // verify the password and generate a jwt token

    const payload = {
      email: User.email,
      id: User._id,
      role: User.role,
    };

    if (await bcrypt.compare(password, User.password)) {
      // Create a JWT Token

      let token = jwt.sign(payload, process.env.JWT_SECRETE, {
        expiresIn: "2h",
      });
      
      User = User.toObject()
      User.token = token;

      User.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        User,
        message: "User login Successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Wrong Password",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "User login failed",
    });
  }
};
