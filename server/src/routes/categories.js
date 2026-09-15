import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({ success: true, categories: ['Rituals', 'Stays', 'General', 'Tips', 'Kashi Facts'] }));
export default router;
