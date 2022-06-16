const express = require('express');
const Book = require('../models/book');

const router = express.Router();

router.get('/genre', async (req, res) => {
    const bookData = await Book.aggregate([
        {
            $unwind: {
                path: '$genre',
            },
        },
        {
            $group: {
                _id: '$genre',
                name: { $first: '$genre' },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    res.send(bookData);
});

router.get('/published-year', async (req, res) => {
    const bookData = await Book.aggregate([
        {
            $group: {
                _id: '$published_year',
                name: { $first: '$published_year' },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    res.send(bookData);
});

module.exports = router;
