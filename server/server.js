require("dotenv").config();

const dns = require("dns");
dns.setServers(["168.63.129.16"]);

const crypto = require("crypto");
global.crypto = crypto.webcrypto;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/Student");

const app = express();

// Cau 58: Cau hinh CORS
const allowedOrigins = [
    process.env.CLIENT_URL,
    "https://cloud-lab-frontend-236167.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000"
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin khong duoc phep boi CORS"));
    },
    credentials: true
}));

app.use(express.json());

// Ket noi MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// Cau 36: GET danh sach sinh vien
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

// Cau 37: POST them sinh vien
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

// Cau 38: PUT cap nhat sinh vien
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
                message: "Khong tim thay sinh vien"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Cau 39: DELETE sinh vien
app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Khong tim thay sinh vien"
            });
        }

        res.json({
            message: "Xoa sinh vien thanh cong"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// API kiem tra Backend
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from Backend!"
    });
});

// Khoi chay server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
