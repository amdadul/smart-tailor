import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates a multer upload instance for given destination folder.
 * @param {string} folderPath - Relative path from project root to upload folder (e.g. 'uploads/profile_pictures')
 * @param {string} fileFieldName - The name of the file field in the form (e.g. 'profilePicture')
 * @returns {Function} - A promise-based function to handle single file upload (req, res)
 */
export function uploadFile(folderPath, fileFieldName) {
  // Setup multer storage engine
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../", folderPath));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed!"));
      }
      cb(null, true);
    },
  });

  // Return a promise to be awaited inside async controllers
  return (req, res) =>
    new Promise((resolve, reject) => {
      upload.single(fileFieldName)(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
}
