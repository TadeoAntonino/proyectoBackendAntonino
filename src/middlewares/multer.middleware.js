import multer from "multer";
import { error } from "winston";

const identificacionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/identificaciones");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const direccionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/direcciones");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const statusStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/status");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadIdent = multer({ storage: identificacionStorage }).single(
  "identificaciones"
);

const uploadDirec = multer({ storage: direccionStorage }).single("direcciones");

const uploadStatus = multer({ storage: statusStorage }).single("status");

const upload = (req, res, next) => {
  const { type } = req.params;

  switch (type) {
    case "identificaciones":
      uploadIdent(req, res, next);
      break;
    case "direcciones":
      uploadDirec(req, res, next);
      break;
    case "status":
      uploadStatus(req, res, next);
      break;
    default:
      return console.log("asdasd");
  }
};

export default upload;
