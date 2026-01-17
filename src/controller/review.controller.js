const reviewService = require("../services/review.service.js") 
const createReview = async(res,req)=>{
    const user = req.user;
    try {
        const review = await reviewService.createReview(req.body,user)
        return res.state(201).send(review);

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllReview = async(res,req)=>{
    const productId = req.params.productId;
    const user = req.user;
    try {
        const reviews = await reviewService.getAllReivew(productId)
        return res.state(201).send(reviews);

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    createReview,
    getAllReview
}