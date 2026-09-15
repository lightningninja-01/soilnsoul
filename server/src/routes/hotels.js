import express from 'express';
import Hotel from '../models/Hotel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        next();
    } catch {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Get all hotels
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find().sort({ createdAt: -1 });
        res.json({ success: true, hotels });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Create a hotel (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(201).json({ success: true, hotel });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Update a hotel (Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
        res.json({ success: true, hotel });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Delete a hotel (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });
        res.json({ success: true, message: 'Hotel deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
