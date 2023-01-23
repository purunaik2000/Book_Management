const { get, default: mongoose } = require('mongoose');
const BookModel = require('../model/BookModel');
const ReviewModel = require('../model/ReviewModel');

const getBooks = async function (req, res) {
    try {
        const queries = req.query;
        const books = await BookModel.find({ ...queries, isDeleted: false })
            .select({title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1});
        if (!books) return res.status(404).send({ status: false, message: "No any book found." });

        books.sort((a, b) => a.title.localeCompare(b.title));
        res.status(200).send({ status: true, data: books });
    } catch (error) {
        res.status(500).send({status: false, message: error.message});
    }
}

const getBook = async function(req,res){
    try {
        const id = req.params.bookId;
        if(!mongoose.isValidObjectId(id)) return rs.status(400).send({status:false, message: "Please enter valid book id."});
        let book = await BookModel.findOne({_id:id, isDeleted:false});
        if(!book) return res.status(404).send({ status: false, message: "Book not found." });
        const reviews = ReviewModel.find({bookId: id});
        book.reviewsData = reviews;
        res.status(200).send({status:true, data: book});
    } catch (error) {
        res.status(500).send({status: false, message: error.message});
    }

}

module.exports.getBooks = getBooks;
module.exports.getBook = getBook;