import express from "express";
import { db } from "../database/databaseConfig.js";

const joinRouter = express.Router()
const { users } = db.data

joinRouter.get('/', (req, res, next) => {
    res.render('join')
})

joinRouter.post('/', async (req, res, next) => {
    users.push({
        id:req.body.id,
        password: req.body.password,
        name: req.body.name,
        birth: req.body.year + req.body.month + req.body.day,
        gender: req.body.gender,
        email: req.body.email,
        tel: req.body.tel,
    })
    await db.write()

    res.send(`회원가입 되었습니다.<br> <a href="/login">로그인하러 가기</a>`)
})

export default joinRouter