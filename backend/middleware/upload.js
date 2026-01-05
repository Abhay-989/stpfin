import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log("📂 Uploading file:", file.originalname);
    console.log("☁️ Cloud Name:", process.env.CLOUD_NAME ? "Loaded" : "Missing"); // Debug env
    const isPDF = file.mimetype === "application/pdf";

    return {
      folder: "studypoint/resources", // change if you want
      resource_type: isPDF ? "raw" : "image",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      allowed_formats: ["jpg", "jpeg", "png", "pdf"]
    };
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});
