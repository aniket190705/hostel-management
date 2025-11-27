const express = require("express");
const Student = require("../models/Student");
const router = express.Router();


router.post("/add", async (req, res) => {
    try {
        const { name, rollNo, roomNo } = req.body;

        const existing = await Student.findOne({ rollNo });
        if (existing) {
            return res.status(409).json({
                message: "Student with this Roll Number already exists."
            });
        }

        const newStudent = new Student(req.body);
        await newStudent.save();

        res.json({
            message: "Student added successfully",
            student: newStudent
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error while adding student",
            error: error.message
        });
    }
});


router.get("/all", async (req, res) => {
    try {
        const students = await Student.find();

        if (students.length === 0) {
            return res.status(404).json({
                message: "No students found in the database."
            });
        }

        res.json({
            students
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error while fetching students",
            error: error.message
        });
    }
});


router.put("/update/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({
                message: "Student not found in the database."
            });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: "Student updated successfully",
            student: updatedStudent
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error while updating student",
            error: error.message
        });
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);


        if (!student) {
            return res.status(404).json({
                message: "Student not found in the database."
            });
        }

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error while deleting student",
            error: error.message
        });
    }
});

module.exports = router;
