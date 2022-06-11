const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
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
