import express from "express";
import mysql from "mysql2";
import { sessions, sessionMiddleware } from "../session.js";


const loginRouter = express.Router()

loginRouter.use(sessionMiddleware)

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '01281028',
    database: 'dallae',
    port: '3306'
})
connection.connect((err) => {
    if(err) {
        console.log(err)
        throw err
    }
})

loginRouter.get('/', (req, res, next) => {
    res.render('login');
})

loginRouter.post('/', (req, res, next) => {
    const userid = req.body.userid;
    const password = req.body.password;

    if (userid && password) {
        connection.query('SELECT * FROM users WHERE userid = ? AND password = ?', [userid, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                const privateKey = Math.floor(Math.random() * 1000000000);
                sessions[privateKey] = results;


                res.setHeader('Set-Cookie', `connect.id=${privateKey}; path=/`);
                res.redirect('/');
                res.end();
            } else {
                res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');
            }
        });
    } else {
        res.send('<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); document.location.href="/login";</script>');
        res.end();
    }



})
export default loginRouter