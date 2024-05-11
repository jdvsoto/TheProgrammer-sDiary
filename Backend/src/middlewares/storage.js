import multer from 'multer';

const save = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        if(file !== null){
            const ext = file.originalname.split('.').pop();
            cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
        }
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

export const uploadImage = multer({
    storage: save,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});