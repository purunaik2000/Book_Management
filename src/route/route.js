const express = require('express');
const router = express.Router();

const userController = require("../controller/userController");
const bookController = require("../controller/bookController");
const reviewController = require("../controller/reviwController");
const Controller = require("../controller/Controller");

router.post('/login', Controller.loginUser);

router.post('/register', userController.createUser);

router.post('/books', bookController.createBook);
router.get('/books', bookController.getBooks);
router.get('/books/:bookId', bookController.getBook);

router.post('/books/:bookId/review', reviewController.createReview);

router.all('/*', (req,res)=> res.status(404).send("Page not found."));

module.exports = router;