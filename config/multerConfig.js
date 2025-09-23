const multer = require("multer");
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.originalUrl);

    let folder = "others";

    if (req.originalUrl.includes("register")) {
      folder = "profile";
    } else if (req.originalUrl.includes("question")) {
      folder = "figure";
    }

    const uploadPath = path.join(__dirname, `../uploads/${folder}`);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

module.exports = { uploads };
