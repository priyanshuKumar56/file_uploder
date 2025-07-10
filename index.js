// 📁 index.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");

const app = express();
const port = 7000;

// Security headers
app.use(helmet());

// Setup EJS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static files (to access uploaded files)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .png, and .pdf files are allowed!"));
    }
  },
});

// Routes
app.get("/", (req, res) => {
  const files = fs.readdirSync(uploadPath);
  res.render("index", { message: null, file: null, files });
});

app.post(
  "/upload",
  body("username").trim().isLength({ min: 3 }).withMessage("Username too short"),
  upload.single("file"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("index", {
        message: errors.array()[0].msg,
        file: null,
        files: fs.readdirSync(uploadPath),
      });
    }

    res.render("index", {
      message: "File uploaded successfully!",
      file: req.file,
      files: fs.readdirSync(uploadPath),
    });
  }
);

app.get("/delete/:filename", (req, res) => {
  const filePath = path.join(uploadPath, req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send("Failed to delete file");
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
