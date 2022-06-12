const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

/* GET users listing. */
router.get('/:id', async (req, res) => {
    const userData = await User.findOne(
        { email: req.params.id },
        { password: 0 }
    );
    res.send(userData);
});

router.post('/:id/updateUser', async (req, res) => {
    if (!req.user) return res.send('You are not logged in.');
    if (req.user.role !== 'admin')
        return res.send('You are not authorized to perform this action');
    const data = req.body;
    if (data.email) res.send('Email field not editable');
    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
    }
    const values = { $set: { ...data } };
    User.findOneAndUpdate(
        { email: req.params.id },
        values,
        { upsert: true, new: true },
        (err, doc) => {
            if (err) return res.send(500, { error: err });
            return res.send(doc);
        }
    );
});

router.delete('/:id', (req, res) => {
    User.deleteOne({ email: req.params.id }, (err) => {
        if (err) return err;
        res.send('User Deleted');
    });
});

router.post('/:id/approveUser', (req, res) => {
    if (!req.user) return res.send('You are not logged in.');
    if (req.user.role !== 'admin')
        return res.send('You are not authorized to perform this action');
    User.findOneAndUpdate(
        { email: req.params.id },
        { $set: { approved: true } },
        { upsert: true, new: true },
        (err, doc) => {
            if (err) return res.send(500, { error: err });
            return res.send(doc);
        }
    );
});

module.exports = router;
