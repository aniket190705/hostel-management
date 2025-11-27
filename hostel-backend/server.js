const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");

const app = express();


app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/students", studentRoutes);

app.listen(3000, () => console.log(`Server running on port ${PORT}`));
