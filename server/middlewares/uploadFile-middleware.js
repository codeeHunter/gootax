const multer = require("multer");
const moment = require("moment");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const date = moment().format("DDMMYYY-HHmmss_SSS");

    cb(null, `${date}-${file.originalname}`);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10,
};

module.exports = multer({
  storage,
  limits,
});
