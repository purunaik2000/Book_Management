const { get, default: mongoose } = require('mongoose');
const BookModel = require('../model/BookModel');
const ReviewModel = require('../model/ReviewModel');
const validation = require('../validation/validation')

let { isEmpty, isValidBookTitle, isVAlidISBN, isVAlidDate } = validation


//>-------------------------------------- CREAT BOOKS ----------------------------------------<//

exports.createBook = async (req, res) => {

    try {
        let bodyData = req.body

        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt, isDeleted, reviews, bookCover, ...rest } = bodyData //Destructuring

        if (Object.keys(rest).length != 0) { //Checking extra attributes are added or not 
            return res.status(400).send({ status: false, message: "Not allowed to add extra attributes" })
        }

        if (!title) {
            return res.status(400).send({ status: false, message: "title is required." })
        }
        if (!isValidBookTitle(title)) {
            return res.status(400).send({ status: false, message: "Please provide Valid Title." })
        }
        if (!excerpt) {
            return res.status(400).send({ status: false, message: "experpt is required." })
        }
        if (!userId) {
            return res.status(400).send({ status: false, message: "userId is required." })
        }
        if (!ISBN) {
            return res.status(400).send({ status: false, message: "ISBN is required." })
        }
        if (!isVAlidISBN(ISBN)) {
            return res.status(400).send({ status: false, message: "Please provide Valid ISBN." })
        }
        if (!category) {
            return res.status(400).send({ status: false, message: "category is required." })
        }
        if (!subcategory) {
            return res.status(400).send({ status: false, message: "subcategory is required." })
        }
        if (!releasedAt) {
            return res.status(400).send({ status: false, message: "releasedAt is required." })
        }
        if (!isVAlidDate(releasedAt)) {
            return res.status(400).send({ status: false, message: "The Date is in inValid Format." })
        }
        if (!bookCover) {
            return res.status(400).send({ status: false, message: "bookCover is required." })
        }

        /*-------------------------------- CHECKING EMPTY AND STRING ----------------------------*/

        if (!isEmpty(title)) {
            return res.status(400).send({ status: false, message: "Title is required" })
        }
        if (!isEmpty(excerpt)) {
            return res.status(400).send({ status: false, message: "Excerpt is required" })
        }
        if (!isEmpty(userId)) {
            return res.status(400).send({ status: false, message: "userId  is required" })
        }
        if (!isEmpty(ISBN)) {
            return res.status(400).send({ status: false, message: "ISBN is required" })
        }
        if (!isEmpty(category)) {
            return res.status(400).send({ status: false, message: "Category is required" })
        }
        if (!isEmpty(subcategory)) {
            return res.status(400).send({ status: false, message: "Sub category is required" })
        }
         if (!isEmpty(bookCover)) {
            return res.status(400).send({ status: false, message: "Book Cover is required" })
        }
        if (!isEmpty(releasedAt)) {
            return res.status(400).send({ status: false, message: "Name is required" })
        }
       


        /*----------------------------------- CHECKING UNIQUE -----------------------------*/


        const titleCheck = await bookModel.findOne({ title })

        const ISBNCheck = await bookModel.findOne({ ISBN })

        const bookCoverCheck = await bookModel.findOne({ bookCover})

        if (titleCheck) {
            return res.status(400).send({ status: false, message: "This title is already exist." })
        }
        if (ISBNCheck) {
            return res.status(400).send({ status: false, message: "This ISBN is already exist." })
        }
        if (bookCoverCheck) {
            return res.status(400).send({ status: false, message: "This Book Cover is already exist." })
        }


        /*---------------------------------------------------------------------------------------*/
 
        let createBook = await bookModel.create(bodyData)

        return res.status(201).send({ status: true, message: `This ${title} Book is created sucessfully.`, data: createBook })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
/*----------------------------------------------------------------------------------------------------------*/
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
module.exports.createBook = createBook;
