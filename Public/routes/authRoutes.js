const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Sequelize User model
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder tempat file akan disimpan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Format nama file
    },
});
const upload = multer({ storage });

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Signup successful', userId: newUser.id });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Store user data in session
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            profilePhoto: user.profilePhoto, 
        };

        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// Logout Route
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Get Current User Route
router.get('/get-user', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        const user = await User.findByPk(req.session.user.id);
        if (user) {
            return res.status(200).json({
                username: user.username,
                email: user.email,
                profilePhoto: user.profilePhoto, // Ambil dari database
                joinedDate: user.createdAt,
            });
        }
        res.status(404).json({ error: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
});

// Fetch user data
router.get('/get-user', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    res.json(req.session.user);
});



// Logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Update Profile Route
router.put('/update-profile', upload.single('profilePhoto'), async (req, res) => {
    const { username } = req.body;
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
        const user = await User.findByPk(req.session.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user data
        user.username = username || user.username;
        if (photoUrl) user.profilePhoto = photoUrl;
        await user.save();

        // Update session data
        req.session.user.username = user.username;
        req.session.user.profilePhoto = user.profilePhoto;

        res.json({ message: 'Profile updated successfully', photoUrl });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update profile', details: err.message });
    }
});

// Delete Account Route
router.delete('/delete-account', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = req.session.user.id;

        const deletedUser = await User.destroy({ where: { id: userId } });

        if (deletedUser) {
            req.session.destroy(); // Destroy session
            res.status(200).json({ message: 'Account deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
});
module.exports = router;
