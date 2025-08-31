//middleware/upload.js

const multer = require("multer");
const path = require("path")

// storage setup
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)   
    }
})

const upload = multer({storage:storage})

module.exports = upload


// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png/;
//     const extname = fileTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = fileTypes.test(file.mimetype);

//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb(new Error("Only images (jpeg, jpg, png) are allowed"));
//     }
//   },
// });