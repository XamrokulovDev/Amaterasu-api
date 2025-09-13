const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Ruxsat etilgan formatlar (rasm + video)
const allowedFormats = [
  "png", "jpg", "jpeg", "gif", "webp", "svg", "avif",
  "mp4", "avi", "mov", "mkv", "webm"
];

// Cloudinary bilan Multer sozlamasi
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const fileFormat = file.mimetype.split("/")[1];
    if (!allowedFormats.includes(fileFormat)) {
      throw new Error("Noto‘g‘ri format!");
    }

    // Video yoki rasm ekanligini aniqlash
    const resourceType = file.mimetype.startsWith("video") ? "video" : "image";

    return {
      folder: "uploads",
      format: fileFormat,
      public_id: file.originalname.split(".")[0],
      resource_type: resourceType, // ⚡️ Muhim!
    };
  },
});

const upload = multer({ storage });

module.exports = upload;