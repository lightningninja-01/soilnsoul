import express from 'express';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ success: false, message: 'Email and password are required' });

        // Password has select:false so we need to explicitly fetch it
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin)
            return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await admin.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ success: false, message: 'Invalid credentials' });

        // Update lastLogin
        admin.lastLogin = new Date();
        await admin.save({ validateBeforeSave: false });

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/auth/setup  — one-time admin creation (disabled if admin exists)
router.post('/setup', async (req, res) => {
    try {
        const count = await Admin.countDocuments();
        if (count > 0)
            return res.status(400).json({ success: false, message: 'Admin already exists' });

        const { name, email, password } = req.body;
        const admin = new Admin({ name, email, password });
        await admin.save();
        res.status(201).json({ success: true, message: 'Admin created successfully' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

export default router;
