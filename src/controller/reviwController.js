const ReviewModel = require('../model/ReviewModel');

const createReview = async function(req,res){
    const data = req.body;
    const result = ReviewModel.create({...data, bookId: req.params.bookId});
    res.status(201).send({status:true, data: result});
}

module.exports.createReview = createReview;