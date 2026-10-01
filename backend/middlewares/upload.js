const multer = require('multer');
const fs = require('fs');
const path = require('path');

const profilesDir = path.join(__dirname, '..', 'uploads', 'profiles');
const eventsDir = path.join(__dirname, '..', 'uploads', 'events');

fs.mkdirSync(profilesDir, { recursive: true });
fs.mkdirSync(eventsDir, { recursive: true });

const getSafeDir = (baseDir, rawId) => {
    const id = parseInt(rawId, 10);
    if (Number.isNaN(id) || id <= 0) {
        throw new Error('ID non valido');
    }
    const targetDir = path.resolve(baseDir, String(id));
    if (!targetDir.startsWith(baseDir)) {
        throw new Error('Percorso non valido');
    }
    return { id, dir: targetDir };
};

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const { dir } = getSafeDir(profilesDir, req.params.id);
            fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        } catch (err) {
            cb(err);
        }
    },
    filename: (req, file, cb) => {
        try {
            const { id, dir } = getSafeDir(profilesDir, req.params.id);
            const ext = path.extname(file.originalname).toLowerCase();
            const oldFiles = fs.readdirSync(dir)
                .filter(name => name.startsWith(`${id}-profilepic.`));

            oldFiles.forEach(name => {
                try {
                    fs.unlinkSync(path.join(dir, name));
                } catch {}
            });

            const filename = `${id}-profilepic${ext}`;
            cb(null, filename);
        } catch (err) {
            cb(err);
        }
    }
});

const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const { dir } = getSafeDir(eventsDir, req.params.id);
            fs.mkdirSync(dir, { recursive: true });
            cb(null, dir);
        } catch (err) {
            cb(err);
        }
    },
    filename: (req, file, cb) => {
        try {
            const { id, dir } = getSafeDir(eventsDir, req.params.id);
            const ext = path.extname(file.originalname).toLowerCase();
            const oldFiles = fs.readdirSync(dir)
                .filter(name => name.startsWith(`${id}-image.`));

            oldFiles.forEach(name => {
                try {
                    fs.unlinkSync(path.join(dir, name));
                } catch {}
            });

            const filename = `${id}-image${ext}`;
            cb(null, filename);
        } catch (err) {
            cb(err);
        }
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
    }),
    event: multer({
        storage: eventStorage,
        fileFilter: filterImage,
        limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
    })
};

module.exports = upload;
