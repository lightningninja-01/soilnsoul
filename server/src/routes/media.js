import express from 'express';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
    try {
        jwt.verify(token, process.env.JWT_SECRET || 'secret');
        next();
    } catch {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/upload', verifyAdmin, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        res.json({
            success: true,
            url: `/uploads/${req.file.filename}`
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
