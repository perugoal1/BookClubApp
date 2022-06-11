const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource');
});

router.post('/', (req, res) => {
    res.send('respond with a resource A');
});

router.put('/', (req, res) => {
    res.send('respond with a resource A');
});

router.delete('/', (req, res) => {
    res.send('respond with a resource A');
});

module.exports = router;
