import express from "express";
import mysql from "mysql2";

const loginRouter = express.Router()
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '01281028',
    port : '3306',
    database : 'dallae'
})
connection.connect();
loginRouter.get('/', (req, res) => {
    res.render('login')
})
loginRouter.post('/', (req, res) => {
    const userid = req.body.userid;
    const password = req.body.password;
    const name = req.body.name;
    const birth = req.body.birth;
    const gender = req.body.gender;
    const email = req.body.email;
    const hp = req.body.hp;

    connection.query('select * from users', (err, rows, fields) => {
        console.log(rows)
    })

    req.session.user = {
        userid,
        password,
        name,
        birth,
        gender,
        email,
        hp
    }
    res.send(`세션 봐봐!! <a href="/mypage">마이페이지 ㄱ ㄱ</a>` )
})
export default loginRouter