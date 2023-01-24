const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const userController = require("../controller/userController");
const bookController = require("../controller/bookController");
const reviewController = require("../controller/reviwController");

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

router.post('/books', auth.authentication, bookController.createBook);
router.get('/books', auth.authentication, bookController.getBooks);
router.get('/books/:bookId', auth.authentication, bookController.getBook);

router.post('/books/:bookId/review', auth.authentication, reviewController.createReview);

router.all('/*', (req,res)=> res.status(404).send("Page not found."));

module.exports = router;