import express from "express";
import {db} from "../database/databaseConfig.js";
import joinRouter from "./joinRouter.js";

const mypageRouter = express.Router()
const { users } = db.data

mypageRouter.get('/', (req, res) => {

    res.render('mypage', {users})
})

export default mypageRouter
