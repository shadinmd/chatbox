import multer from "multer"

export const profileUpload = multer({
    storage: multer.memoryStorage(),

})