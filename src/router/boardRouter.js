import express from "express";
import {db} from "../database/databaseConfig.js";

const boardRouter = express.Router()
const {posts} = db.data

boardRouter.get('/', (req, res) => {
    res.render('board', {posts})
})

boardRouter.get('/write', (req, res) => {
    res.render('write')
})

boardRouter.post('/', async (req, res) => {
    posts.push({
        title : req.body.title,
        contents : req.body.contents
    })

    await db.write()

    res.send('저장되었습니다')
})
export default boardRouter