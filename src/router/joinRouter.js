import express from "express";

const joinRouter = express.Router()
joinRouter.get('/', (req, res, next) => {
    res.render('join')
})

export default joinRouter
