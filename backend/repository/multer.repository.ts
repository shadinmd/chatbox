import multer from "multer"

class MulterRepository {
    constructor(){}

    public static upload = multer({
        storage : multer.memoryStorage()
    })
}

export default MulterRepository