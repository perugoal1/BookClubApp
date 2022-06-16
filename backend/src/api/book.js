const express = require('express');
const Book = require('../models/book');

const router = express.Router();

/* GET home page. */
router.get('/:id', async (req, res) => {
    const userData = await Book.findOne({ _id: req.params.id });
    res.send(userData);
});

router.post('/create', async (req, res) => {
    const booksToCreate = [];
    console.log(11111, req.body.copies);
    for (let x = 0; x < req.body.copies; x += 1) {
        console.log(66666);
        booksToCreate.push(Book.create({ ...req.body, availability: true }));
    }
    await Promise.all(booksToCreate);
    console.log(5555);
    res.send('Added Books');
});

router.post('/getAllBooks', async (req, res) => {
    const { perPage, page, searchText } = req.body;
    let users;
    if (searchText) {
        if (perPage) {
            users = await Book.find({
                $or: [
                    {
                        title: { $regex: searchText },
                    },
                    {
                        description: { $regex: searchText },
                    },
                    {
                        author: { $regex: searchText },
                    },
                ],
            })
                .skip(perPage * page)
                .limit(perPage);
        } else {
            users = await Book.find({
                $or: [
                    {
                        title: { $regex: searchText },
                    },
                    {
                        description: { $regex: searchText },
                    },
                    {
                        author: { $regex: searchText },
                    },
                ],
            });
        }
    } else {
        // eslint-disable-next-line no-lonely-if
        if (perPage) {
            users = await Book.find({})
                .skip(perPage * page)
                .limit(perPage);
        } else {
            users = await Book.find({});
        }
    }
    res.send(users);
});

router.post('/:id/update', (req, res) => {
    const data = req.body;
    const values = { $set: { ...data } };
    Book.findOneAndUpdate(
        { _id: req.params.id },
        values,
        { upsert: true, new: true },
        (err, doc) => {
            if (err) return res.send(500, { error: err });
            return res.send(doc);
        }
    );
});

router.delete('/:id/delete', (req, res) => {
    Book.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return err;
        res.send('User Deleted');
    });
});

router.post('/:id/borrow', async (req, res) => {
    if (!req.user) return res.send('You are not logged in.');
    const bookData = await Book.findOne({ _id: req.params.id });
    if (!bookData.availability) {
        return res.send('Book is not available'); // book is not available
    }
    bookData.availability = false;
    if (bookData.current_borrower) {
        if (req.user.id === bookData.current_borrower.toString())
            return res.send('You have already borrowed this book.'); // user has already borrowed this book
    }
    bookData.last_borrower = req.user.id;
    bookData.current_borrower = req.user.id;
    const updatedBook = await bookData.save();
    res.send(updatedBook);
});

router.post('/:id/return', async (req, res) => {
    if (!req.user) return res.send('You are not logged in.');
    const bookData = await Book.findOne({ _id: req.params.id });
    bookData.availability = true;
    if (!bookData.current_borrower)
        return res.send('You have not borrowed this book.'); // user has not borrowed this book
    if (bookData.current_borrower) {
        if (req.user.id !== bookData.current_borrower.toString())
            return res.send('You have not borrowed this book.'); // user has not borrowed this book
    }
    bookData.current_borrower = null;
    const updatedBook = await bookData.save();
    res.send(updatedBook);
});

module.exports = router;
