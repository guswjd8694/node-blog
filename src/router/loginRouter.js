import express from "express";
import {db} from "../database/databaseConfig.js";

const loginRouter = express.Router()
const {users} = db.data


loginRouter.get('/', (req, res, next) => {
    res.render('login')
})

loginRouter.post('/', (req, res, next) => {
    const user = users.find((user) => user.id === req.body.id)

    console.log(user)

    if(user === undefined){
        res.send('회원아아님니다')
    }
    else if(user.id === req.body.id){

        if(user.password !== req.body.password){
            res.send('비밀번호가 틀렸습니다')
        }

        res.send(`로그인성공 <br> <a href="/board">게시판 보러가기</a>`)
    }

})
export default loginRouter