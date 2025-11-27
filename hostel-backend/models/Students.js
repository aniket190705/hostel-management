const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    roomNo: {
        type: String,
        required: true
    },
    course: {
        type: String,
    },
    year: {
        type: Number,
    },
});

module.exports = mongoose.model("Student", studentSchema);
