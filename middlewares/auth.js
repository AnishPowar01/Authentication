// auth , isStudent,  isAdmin

const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // extracting jwt token

    const token = req.body.token;

    if (!token) {
      return res.status(200).json({
        success: false,
        message: "Token not found",
      });
    }

    // verify the token

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRETE);

      console.log(decode);

      // to transfer to second middlerware

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: true,
        message: "Token invalid",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }

  next();
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "Other than student role is not allowed",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role is not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Other than Admin role is not allowed",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User role is not matching",
    });
  }
};
