import multer from "multer";

const storage = multer.diskStorage({
    // agar file bhi aa rhi hai to we can access it via multer
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    console.log(file)
    cb(null, file.originalname) // usually we shouldnt keep original file name
  }
})
// this would return a filename

export const upload = multer({ 
    storage, 
})