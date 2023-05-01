const user = require("../models/user");

const bcrypt = require("bcrypt");

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


exports.login = async() =>{
  

}
