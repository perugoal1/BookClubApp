const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');
const MakerChecker = require('../models/makerChecker');

const router = express.Router();

/* GET users listing. */
router.get('/:id', async (req, res) => {
    const userData = await User.findOne(
        { _id: req.params.id },
        { password: 0 }
    );
    res.send(userData);
});

router.post('/create', passport.authenticate('local-signup'), (req, res) => {
    res.send('Success');
});

router.post('/:id/update', async (req, res) => {
    if (!req.user) return res.send('You are not logged in.');
    if (req.user.role !== 'admin')
        return res.send('You are not authorized to perform this action');
    const data = { ...req.body };
    if (data.email) res.send('Email field not editable');
    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
    }

    const userData = await User.findOne(
        { _id: req.params.id },
        { password: 0 }
    );

    // eslint-disable-next-line no-underscore-dangle
    const values = {
        $set: {
            data,
            type: 'user',
            action: 'update',
            itemId: userData._id,
            primary_admin: req.user.id,
        },
    };
    MakerChecker.findOneAndUpdate(
        { _id: req.params.id },
        values,
        { upsert: true, new: true },
        (err, doc) => {
            if (err) return res.send(500, { error: err });
            return res.send(doc);
        }
    );
});

router.delete('/:id/delete', async (req, res) => {
    const userData = await User.findOne(
        { _id: req.params.id },
        { password: 0 }
    );

    const values = {
        $set: {
            type: 'user',
            action: 'delete',
            itemId: userData._id,
            primary_admin: req.user.id,
        },
    };
    MakerChecker.findOneAndUpdate(
        { _id: req.params.id },
        values,
        { upsert: true, new: true },
        (err, doc) => {
            if (err) return res.send(500, { error: err });
            return res.send(doc);
        }
    );
});

router.post('/:id/approveUser', async (req, res) => {
    console.log(444, req.user);
    if (!req.user) return res.send('You are not logged in.');
    if (req.user.role !== 'admin')
        return res.send('You are not authorized to perform this action');

    const {
        action,
        data,
        itemId,
        primary_admin: primaryAdmin,
    } = await MakerChecker.findById(req.params.id);
    if (req.user.id === primaryAdmin.toString()) {
        return res.send(
            'You cannot approve the changes created by yourself. It requires approval from another admin.'
        );
    }
    console.log(111, action, data, itemId);
    switch (action) {
        case 'create':
            await User.create(data);
            await MakerChecker.deleteOne({ _id: req.params.id });
            res.send('Added User');
            break;
        case 'update':
            await User.findOneAndUpdate(
                { _id: itemId },
                { $set: { ...data } },
                { upsert: true, new: true }
            );
            await MakerChecker.deleteOne({ _id: req.params.id });
            res.send('Updated User');
            break;
        case 'delete':
            await User.deleteOne({ _id: itemId });
            await MakerChecker.deleteOne({ _id: req.params.id });
            res.send('Deleted User');
            break;
        default:
            res.send('Updated');
    }
});

module.exports = router;
