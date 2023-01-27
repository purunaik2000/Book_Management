const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const userController = require("../controller/userController");
const bookController = require("../controller/bookController");
const reviewController = require("../controller/reviewController");

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

router.post('/books', auth.authentication, bookController.createBook);
router.get('/books', auth.authentication, bookController.getBooks);
router.get('/books/:bookId', auth.authentication, bookController.getBook);
router.put('/books/:bookId', auth.authentication, auth.authorisation, bookController.updateBook);
router.delete('/books/:bookId', auth.authentication, auth.authorisation, bookController.deletedBook);

router.post('/books/:bookId/review', reviewController.createReview);
router.put('/books/:bookId/review/:reviewId', reviewController.updateReview);
router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReview);

router.all('/*', (req,res)=> res.status(404).send("Page not found."));

module.exports = router;