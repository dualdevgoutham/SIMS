const express = require("express");
const router = express.Router();
const Faculty = require("../models/facultyModel");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const { request } = require("express");

//Register New Faculty

router.post("/register", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const facultyExists = await Faculty.findOne({
      facultyId: req.body.facultyId,
    });
    if (facultyExists) {
      return res.status(200).send({
        message: "Faculty already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newFaculty = new Faculty(req.body);
    await newFaculty.save();
    res.status(200).send({
      message: "Registration successfull,Please wait for admin approval",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      sucess: false,
    });
  }
});

// Faculty Login

router.post("/login", async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      facultyId: req.body.facultyId,
    });
    if (!faculty) {
      return res.status(200).send({
        message: "Faculty not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, faculty.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid password",
        success: false,
      });
    }
    if (faculty.isApproved === false) {
      return res.status(200).send({
        message: "Your account is not approved yet , wait for admin approval",
        success: false,
      });
    }
    const token = jwt.sign({ facultyId: faculty._id }, process.env.jwt_secret, {
      expiresIn: "24h",
    });
    res.status(200).send({
      message: "Login successfull",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get Facutly by Id

router.post("/get-faculty-by-id", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const faculty = await Faculty.findOne({
      _id: req.body.facultyId,
    });
    if (!faculty) {
      return res.status(200).send({
        message: "Faculty not found",
        success: false,
      });
    }
    faculty.password = undefined;
    res.status(200).send({
      message: "Faculty found",
      success: true,
      data: faculty,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
