require("dotenv").config();
const dns = require("dns");
dns.setServers(["168.63.129.16"]);

const crypto = require('crypto');
global.crypto = crypto.webcrypto;

const express = require('express');
const mongoose = require('mongoose');

const cors = require("cors");
const Student = require("./models/Student");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());


// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });


// Câu 36: GET danh sách sinh viên
app.get("/api/students", async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Câu 37: POST thêm sinh viên
app.post("/api/students", async (req, res) => {

    try {

        const student = await Student.create(req.body);

        res.status(201).json(student);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// Câu 38: PUT cập nhật sinh viên
app.put("/api/students/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json(student);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// Câu 39: DELETE sinh viên
app.delete("/api/students/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json({
            message: "Xóa sinh viên thành công"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// Chạy server
const PORT = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Backend!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});