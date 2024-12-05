const express = require('express');
const router = express.Router();
const mainController = require('../public/js/controllers/mainController');
const isAuthenticated = require('../Middleware/isAuthenticated');
const Review = require('../models/review');
const User = require('../models/user');

// Route untuk mendapatkan data user
router.get('/get-user', (req, res) => {
    if (req.session && req.session.user) {
        return res.json({ username: req.session.user.username });
    }
    res.status(401).json({ error: 'User not logged in' });
});

// Route untuk melindungi path dengan middleware isAuthenticated
router.get('/protected-route', isAuthenticated, (req, res) => {
    res.json({ message: 'You have access to this protected route' });
});

// Ambil semua review
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: { model: User, attributes: ['username'] },
            order: [['createdAt', 'DESC']],
        });

        console.log('Fetched reviews:', reviews); // Debug fetched data
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error); // Log error detail
        res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
    }
});

// Tambahkan review baru
router.post('/reviews', isAuthenticated, async (req, res) => {
    try {
        console.log('Session user:', req.session.user); // Debug session data
        const { content } = req.body;
        console.log('Content received:', content); // Debug input

        if (!content) {
            return res.status(400).json({ error: 'Review content cannot be empty' });
        }

        const newReview = await Review.create({
            userId: req.session.user.id, // Ensure req.session.user.id exists
            content,
        });

        console.log('Review successfully created:', newReview); // Debug saved data
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error); // Log error details
        res.status(500).json({ error: 'Failed to create review', details: error.message });
    }
});

// Route untuk halaman utama
router.get('/', mainController.renderHomePage);

module.exports = router;
