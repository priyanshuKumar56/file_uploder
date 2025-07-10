# 📁 Express File Upload App

A full-featured Express.js application to upload, display, and delete files with security features, input validation, and EJS templating.

---

## 🚀 Features

* ✅ File Upload using Multer
* ✅ File type restriction (`.jpeg`, `.png`, `.pdf`)
* ✅ File size limit (5MB)
* ✅ Delete uploaded files from the browser
* ✅ EJS templating for UI
* ✅ Upload folder auto-creation
* ✅ Helmet for HTTP security headers
* ✅ Input validation using `express-validator`
* ✅ Serve uploaded files as static content

---

## 📂 Project Structure

```
├── index.js              # Main server code
├── views/
│   └── index.ejs         # Upload form + preview UI
├── uploads/              # Uploaded files saved here
└── package.json
```

---

## 📦 Installation

```bash
git clone https://github.com/your-username/express-file-upload-app.git
cd express-file-upload-app
npm install
```

---

## 🧪 Usage

Start the server:

```bash
node index.js
```

Then visit: [http://localhost:7000](http://localhost:7000)

---

## 📝 Form Fields (in index.ejs)

* `username` — required, at least 3 characters
* `file` — allowed types: `.jpg`, `.png`, `.pdf`

---

## ⚠️ Notes

* Uploads are stored locally in the `/uploads` folder
* If the folder doesn’t exist, it will be created automatically
* Add `.gitignore` rule if you don’t want to commit uploaded files:

  ```
  /uploads
  ```

---

## 👨‍💻 Author

Made by [Your Name](https://github.com/your-username) — Feel free to fork and enhance!

---

## 📄 License

MIT © 2025 Priyanshu Kumar
