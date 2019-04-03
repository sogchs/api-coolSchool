const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
 

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'coolSchool',
  allowFormats: ['jpg', 'png', 'pdf', 'doc', 'mp3', 'mp4', 'h264', 'mov', 'avi', 'mkv'],
  filename: (req, file, next) => {
    next(null, `${Date.now()}${file.originalname}`)
  }
})

module.exports = multer({ storage })