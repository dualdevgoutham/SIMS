const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Student = require("../models/studentModel");

//add new Student

router.post("/add-student", authMiddleware, async (req, res) => {
  try {
    const studentExists = await Student.findOne({
      rollNo: req.body.rollNo,
    });
    if (studentExists) {
      return res.status(200).send({
        message: "Student already exists",
        success: false,
      });
    }
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(200).send({
      message: "Student added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get all students

router.post("/get-all-students/", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find(req.body ? req.body : {});
    res.status(200).send({
      message: "Students fetched successfully",
      success: true,
      data: students,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get all student by rollNo

router.post("/get-student/:rollNo", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNo: req.params.rollNo,
    });
    if (!student) {
      return res.send({
        message: "Student not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Student fetched successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// update student

router.post("/update-student/:rollNo", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true }
    );
    if (!student) {
      return res.send({
        message: "Student not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Student updated successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// delete student

router.post("/delete-student/:rollNo", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      rollNo: req.params.rollNo,
    });
    if (!student) {
      return res.send({
        message: "Student not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Student deleted successfully",
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/search/:query", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find({
      // firstName: { $regex: ".*" + req.params.query + ".*" },
      rollNo: { $regex: ".*" + req.params.query + ".*" },
    });
    if (!students) {
      return res.send({
        message: "Students not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Student search results",
      success: true,
      data: students,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

module.exports = router;
