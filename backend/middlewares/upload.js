const multer = require('multer');
const fs = require('fs');
const path = require('path');

const profilesDir = path.join(__dirname, '..', 'uploads', 'profiles');

fs.mkdirSync(profilesDir, { recursive: true });

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profilesDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, filename);
    }
});

const filterImage = (req, file, cb) => {
    const mimeOK = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
    const extOk = ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file.originalname).toLowerCase());

    if (mimeOK && extOk) {
        cb(null, true);
    } else {
        const err = new Error('Formato non supportato: carica un file jpg, jpeg, png o webp');
        err.statusCode = 400;
        cb(err, false);
    }
};

const upload = {
    profile: multer({
        storage: profileStorage,
        fileFilter: filterImage,
        limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
    })
};

module.exports = upload;
