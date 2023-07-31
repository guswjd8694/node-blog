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


    connection.query('select * from users where userid = ?', [req.body.userid] , (err, rows, fields) => {
        const userid = rows[0].userid;
        const password = rows[0].password;
        const name = rows[0].name;
        const birth = rows[0].birth;
        const gender = rows[0].gender;
        const email = rows[0].email;
        const hp = rows[0].hp;

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
})
export default loginRouter