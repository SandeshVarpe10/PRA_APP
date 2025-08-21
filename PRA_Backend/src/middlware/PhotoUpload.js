let multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/"); // save in /public/images/
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname); // avoid overwrite
  }
});

let upload = multer({ storage: storage });

module.exports = upload;
