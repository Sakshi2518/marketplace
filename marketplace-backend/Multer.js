const multer = require('multer');

// Configure file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp'); // specify the temp folder to store files temporarily
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // use original file name
  }
});

// Validate file type (only images allowed)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.'), false); // Reject the file
  }
};

// Set up multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Set file size limit to 5MB
  },
});

module.exports = { upload };
