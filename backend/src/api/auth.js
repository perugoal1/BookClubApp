const express = require('express');
const passport = require('passport');

const router = express.Router();

/* GET home page. */
router.post('/login', passport.authenticate('local-login'), (req, res) => {
    res.send('Success');
});

router.post('/logout', (req, res) => {
    res.send('respond with a resource A');
});

router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    res.send('Success');
});

module.exports = router;
