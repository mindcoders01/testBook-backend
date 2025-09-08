const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.originalUrl);
    
    let folder = "others";

    if (req.originalUrl.includes("register")) {
      folder = "profile";
    } else if (req.originalUrl.includes("question")) {
      folder = "question";
    }

    cb(null, path.join(__dirname, `../uploads/${folder}`));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploads = multer({
  storage: storage,
  limit:{fileSize: 5 * 1024 * 1024 }
});

module.exports = { uploads };
