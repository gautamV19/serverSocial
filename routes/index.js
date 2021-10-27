const express = require('express');
const router = express.Router();

console.log("router loaded");

router.get('/', (req, res) => { res.json({ message: 'Hello World' }); });

module.exports = router;