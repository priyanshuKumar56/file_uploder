const express = require("express");
const app = express();
const port = 7000;
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// Set EJS as the templating engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
// app.set("views", "./views");

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.render("index", { message: "Hello, World!" });
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
