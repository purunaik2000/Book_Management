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
router.put('/books/:bookId', auth.authentication, auth.authorisation, bookController.updateBook);
router.delete('/books/:bookId', auth.authentication, auth.authorisation, bookController.deletedBook);

router.post('/books/:bookId/review', auth.authentication, auth.authorisation, reviewController.createReview);
router.put('/books/:bookId/review/:reviewId', auth.authentication, auth.authorisation, reviewController.updateReview);
router.delete('/books/:bookId/review/:reviewId', auth.authentication, auth.authorisation, reviewController.deleteReview);

router.all('/*', (req,res)=> res.status(404).send("Page not found."));

module.exports = router;