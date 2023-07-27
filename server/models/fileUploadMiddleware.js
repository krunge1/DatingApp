const multer = require("multer");
const fs = require("fs");

const uploadMiddleware = multer({ dest: "uploads" });

const fileUpload = (req, res, next) => {
uploadMiddleware.array("pictures", 100)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: "File upload error" });
    } else if (err) {
    return res.status(500).json({ message: "Something went wrong", error: err });
    }

    // Modify file paths and store them in req.uploadedFiles array
    req.uploadedFiles = req.files.map((file) => {
    if (file.mimetype.split("/")[0] === "image") {
        const { path, originalname } = file;
        const parts = originalname.split(".");
        const extension = parts[parts.length - 1];
        const newPath = `${path}.${extension}`;
        fs.renameSync(path, newPath);
        return newPath.replace("/uploads/g","");
    } else {
        return null;
    }
    });

    // Remove any null values from the array (non-image files)
    req.uploadedFiles = req.uploadedFiles.filter((file) => file !== null);

    next();
});
};

module.exports = fileUpload;
