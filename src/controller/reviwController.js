const { default: mongoose } = require('mongoose');
const ReviewModel = require('../model/ReviewModel');
const BookModel = require('../model/BookModel');
const { isValidName } = require('../validator/validation');

exports.createReview = async function (req, res) {
    try {
        const data = req.body;
        const bookId = req.params.bookId
        Object.keys(data).forEach(
            (x) => (data[x] = data[x].toString().trim())
        );

        const { reviewedBy, reviewedAt, rating } = data

        if (!reviewedBy) return res.status(400).send({ status: false, message: "reviewedBy must present" })

        if (!reviewedAt) return res.status(400).send({ status: false, message: "reviewedAt must present" })

        if (!rating) return res.status(400).send({ status: false, message: "rating must present" })

        data.bookId = bookId;
        const result = await ReviewModel.create(req.body);

        await BookModel.findByIdAndUpdate(bookId, { reviews: req.book.reviews+1 });
        return res.status(201).send({ status: true, data: { _id: result._id, reviewedBy: result.reviewedBy, reviewedAt: result.reviewedAt, rating: result.rating, review: result.review } });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

exports.updateReview = async function (req, res) {
    try {
        const reviewId = req.params.reviewId;
        if (!mongoose.isValidObjectId(reviewId))
            return res.status(400).send({ status: false, message: "Invalid reviewId." });
        const data = req.body;
        Object.keys(data).forEach(x => data[x] = data[x].toString().trim());

        const { review, rating, reviewedBy } = data;

        if (!review || !rating || !reviewedBy)
            return res.status(400).send({ status: false, message: "Please send any field that you want to update." });
        if (rating && (isNaN(rating) || rating > 5 || rating < 1)) {
            return res.status(400).send({ status: false, message: "Please provide a number between 1 & 5 in rating." });
        }
        if (reviewedBy && !isValidName(reviewedBy))
            return res.status(400).send({ status: false, message: "Please provide valid reviewer's name." });

        const updatedReview = await ReviewModel.findOneAndUpdate(
            {
                _id: reviewId,
                bookId: req.params.bookId,
                isDeleted: false
            },
            {
                review, reviewedBy, rating
            },
            {
                new: true
            }
        )

        if (!updatedReview) return res.status(404).send({ status: false, message: "No such review found." });

        res.status(200).send({ status: true, data: updatedReview });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

exports.deleteReview = async function (req, res) {
    try {
      let reviewId = req.params.reviewId;
      let review = await ReviewModel.findOneAndUpdate(
        { _id: reviewId, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );
      if (!review)
        return res
          .status(404)
          .send({ status: false, message: "review not exist" });
      await BookModel.findByIdAndUpdate(req.params.bookId, {
        reviews: req.book.reviews - 1,
      });
      res.status(200).send({ status: true, msg: "review is deleted" });
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
  };