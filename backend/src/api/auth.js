const express = require('express');
const passport = require('passport');

const router = express.Router();

/* GET home page. */
router.post('/login', passport.authenticate('local-login'), (req, res) => {
    const data = { ...req.user._doc };
    delete data.password;
    res.send(data);
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out successfully.');
});

module.exports = router;
