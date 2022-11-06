const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const Result = require("../models/resultsModel");
const Student = require("../models/studentModel");
// add new result
router.post("/add-result", authMiddleware, async (req, res) => {
  try {
    const resultsExists = await Result.findOne({
      examName: req.body.examName,
    });
    if (resultsExists) {
      return res.status(200).send({
        message: "Results already exists",
        success: false,
      });
    }
    const newResult = new Result(req.body);
    await newResult.save();
    res.status(200).send({
      message: "Result added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get all results

router.post("/get-all-results", async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).send({
      message: "Results retrieved successfully",
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get result by Id

router.post("/get-result/:resultId", authMiddleware, async (req, res) => {
  try {
    const result = await Result.findById(req.params.resultId);
    res.status(200).send({
      message: "Result retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

//add student result
router.post("/save-student-result", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.body.studentId);
    if (!student) {
      return res.status(200).send({
        message: "student not found",
        success: false,
      });
    }
    let newResults = student.results;
    const existingResults = student.results;
    const resultExists = existingResults.find(
      (result) => result.resultId === req.body.resultId
    );
    if (resultExists) {
      newResults = existingResults.map((result) => {
        if (result.resultId === req.body.resultId) {
          return {
            ...result,
            obtainedMarks: req.body.obtainedMarks,
            verdict: req.body.verdict,
          };
        }
        return result;
      });
    } else {
      newResults = [...existingResults, req.body];
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.body.studentId,
      {
        results: newResults,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Result saved successfully",
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// get student result by Id

router.post("/get-student-result", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNo: req.body.rollNo,
    });
    if (!student) { 
      return res.status(200).send({
        message: "Student not found",
        success:false,
      })
    }
    const resultExists = student.results.find(
      (result) => result.resultId === req.body.resultId
    );
    if (!resultExists){
      return res.status(200).send({
        message: "Result not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Result retrieved successfully",
      success: true,
      data: {
        ...resultExists,
        studentId: student._id,
        firstName: student.firstName,
        lastName:student.lastName,
      },
    })
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success:false,
    })
  }
})

router.post("/search/:query", authMiddleware, async (req, res) => {
  try {
    const results = await Result.find({
      examName: { $regex: ".*" + req.params.query + ".*" },
    });
    if (!results) {
      return res.send({
        message: "Examiantion results not found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Exam search results",
      success: true,
      data:results,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});



module.exports = router;
