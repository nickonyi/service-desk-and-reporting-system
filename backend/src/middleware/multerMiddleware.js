// multerMiddleware.js
import upload from "./upload.js";

export const handleMulterErrors = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("MULTER ERROR:", err);
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};
