import express from "express";

const logoutRouter = express.Router()

logoutRouter.get('/', (req, res) => {
    req.session.user = null
    req.session.save((err) => {
        req.session.regenerate((err) => {
            res.redirect('/')
        })
    })
})
export  default  logoutRouter