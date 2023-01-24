const { get, default: mongoose } = require("mongoose");
const BookModel = require("../model/BookModel");
const ReviewModel = require("../model/ReviewModel");
const validation = require("../validator/validation");
let { isValidBookTitle, isVAlidISBN, isVAlidDate } = validation;

//>-------------------------------------- CREAT BOOKS ----------------------------------------<//

exports.createBook = async (req, res) => {
    try {
        let bodyData = req.body;
        Object.keys(bodyData).forEach(
            (x) => (bodyData[x] = bodyData[x].toString().trim())
        );

        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt, isDeleted, reviews, ...rest } = bodyData; //Destructuring

        if (Object.keys(rest).length != 0) {
            //Checking extra attributes are added or not
            return res
                .status(400)
                .send({
                    status: false,
                    message: "Not allowed to add extra attributes",
                });
        }

        if (!title) {
            return res
                .status(400)
                .send({ status: false, message: "title is required." });
        }
        if (!isValidBookTitle(title)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide Valid Title." });
        }
        if (!excerpt) {
            return res
                .status(400)
                .send({ status: false, message: "experpt is required." });
        }
        if (!userId) {
            return res
                .status(400)
                .send({ status: false, message: "userId is required." });
        }
        if (!ISBN) {
            return res
                .status(400)
                .send({ status: false, message: "ISBN is required." });
        }
        if (!isVAlidISBN(ISBN)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide Valid ISBN." });
        }
        if (!category) {
            return res
                .status(400)
                .send({ status: false, message: "category is required." });
        }
        if (!subcategory) {
            return res
                .status(400)
                .send({ status: false, message: "subcategory is required." });
        }
        if (!releasedAt) {
            return res
                .status(400)
                .send({ status: false, message: "releasedAt is required." });
        }
        if (!isVAlidDate(releasedAt)) {
            return res
                .status(400)
                .send({ status: false, message: "The Date is in inValid Format." });
        }

        /*----------------------------------- CHECKING UNIQUE -----------------------------*/

        const check = await BookModel.findOne({ $or: [{ title }, { ISBN }] });

        if (check) {
            if (check.title == title) {
                return res
                    .status(400)
                    .send({ status: false, message: "This title is already exist." });
            }
            if (check.ISBN == ISBN) {
                return res
                    .status(400)
                    .send({ status: false, message: "This ISBN is already exist." });
            }
        }

        /*---------------------------------------------------------------------------------------*/

        bodyData.releasedAt = Date(releasedAt);
        let createBook = await BookModel.create(bodyData);

        return res
            .status(201)
            .send({
                status: true,
                message: `This ${title} Book is created sucessfully.`,
                data: createBook,
            });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
/*----------------------------------------------------------------------------------------------------------*/



//<-------------------------------------# Get Books #------------------------------------->//

exports.getBooks = async function (req, res) {
    try {
        const queries = req.query;
        const books = await BookModel.find({ ...queries, isDeleted: false }).select(
            {
                title: 1,
                excerpt: 1,
                userId: 1,
                category: 1,
                subcategory: 1,
                releasedAt: 1,
                reviews: 1,
            }
        );
        if (!books)
            return res
                .status(404)
                .send({ status: false, message: "No any book found." });

        books.sort((a, b) => a.title.localeCompare(b.title));
        res.status(200).send({ status: true, data: books });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};


//<-------------------------------------# Get Book #------------------------------------->//

exports.getBook = async function (req, res) {
    try {
        const id = req.params.bookId;
        if (!mongoose.isValidObjectId(id))
            return res
                .status(400)
                .send({ status: false, message: "Please enter valid book id." });
        let book = await BookModel.findOne({ _id: id, isDeleted: false });
        if (!book)
            return res
                .status(404)
                .send({ status: false, message: "Book not found." });
        const reviews = await ReviewModel.find({ bookId: id });
        book._doc.reviewsData = reviews;
        res
            .status(200)
            .send({ status: true, data: book });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

//<-------------------------------------# Delete Book #------------------------------------->//

exports.deletedBook = async (req, res) => {
    try {
      let bookId = req.params.bookId;
      let checkBookId = await BookModel.findById(bookId);
      if (!checkBookId || checkBookId.isDeleted == true) {
        return res
          .status(404)
          .send({ status: false, msg: "Book has been already deleted " });
      }
      let deletedBook = await BookModel.findOneAndUpdate(
        { _id: blogId },
        { $set: { isDeleted: true } },
        { new: true }
      );
      return res.status(200).send({
        status: true,
        msg: "Book has been deleted successfully",
        data: deletedBook,
      });
    } catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  };