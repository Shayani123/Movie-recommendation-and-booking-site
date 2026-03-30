import multer from "multer";

// const storage = multer.memoryStorage();
// export const upload = multer({storage : storage});

const storage = multer.diskStorage({
    destination: function (req,file, cb) {
        cb(null , "movies/");
    },
    filename: function (rq,file,cb) {
        cb(null , Date.now() + "-" + file.originalname);
    }
});

export const upload = multer({ storage });