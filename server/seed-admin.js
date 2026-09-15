/**
 * seed-admin.js  —  Run ONCE to create the admin user in MongoDB.
 *
 * Usage:
 *   cd server
 *   node seed-admin.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/Admin.js';

dotenv.config();

// ── Admin credentials — change before running ─────────────────────────────────
const ADMIN_NAME = 'Soil n Soul Admin';
const ADMIN_EMAIL = 'admin@soilnsoul.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) throw new Error('Set ADMIN_PASSWORD in your local environment before running this script.');
// ─────────────────────────────────────────────────────────────────────────────

async function seed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected!\n');

        const existing = await Admin.findOne({ email: ADMIN_EMAIL });
        if (existing) {
            console.log(`⚠️  Admin with email "${ADMIN_EMAIL}" already exists.`);
            console.log('   Delete the document from MongoDB Atlas and re-run if you need to reset.\n');
        } else {
            const admin = new Admin({
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
            });
            await admin.save();
            console.log('🎉 Admin created successfully!\n');
            console.log('┌──────────────────────────────────────────────┐');
            console.log('│  Admin Panel — Login Credentials             │');
            console.log('├──────────────────────────────────────────────┤');
            console.log(`│  URL      : /hakunamata                      │`);
            console.log(`│  Email    : ${ADMIN_EMAIL.padEnd(33)} │`);
            console.log('└──────────────────────────────────────────────┘\n');
        }
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected.');
    }
}

seed();
