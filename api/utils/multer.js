import multer from 'multer';

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == 'photo') {
      cb(null, 'public/images/photo');
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname == 'photo') {
      cb(null, Date.now() + '_' + file.originalname);
    }
  },
});

const productUplaod = multer({
  storage: storage,
}).fields([
  {
    name: 'photo',
    maxCount: 1,
  },
]);
