import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads") //directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const filename = file.originalname
    cb(null, filename) // set the name of uploaded file
  },
})

const upload = multer({ storage })

export default upload
