const express = require('express');
const router = express.Router();




router.all('/*', res.status(404).send("Page not found."));

module.exports = router;