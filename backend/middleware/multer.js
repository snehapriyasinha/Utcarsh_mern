import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure 'uploads' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/"); // Store in 'uploads' folder
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });
export default upload;
