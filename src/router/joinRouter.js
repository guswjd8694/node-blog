import express from "express";
import mysql from "mysql2";

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

const joinRouter = express.Router()
joinRouter.get('/', (req, res, next) => {
    res.render('join')
})

joinRouter.post('/', (req, res, next) => {
    const userid = req.body.userid;
    const password = req.body.password;
    const name = req.body.name;
    const birth = req.body.year + '-' + req.body.month + '-' + req.body.day
    const gender = req.body.gender;
    const email = req.body.email;
    const hp = req.body.hp;
    const param = [userid, password, name, birth, gender, email, hp]

    if (userid && password && name) {
        connection.query('select * from users where userid = ? and password = ? and name = ?', [userid, password, name], (err, results) => {
            if(err) throw err;
            if(results.length <= 0){
                connection.query('insert into users(userid, password, name, birth, gender, email, hp) values(?, ?, ?, ?, ?, ?, ?)', param, (err, data) => {
                    if(err) {console.log(err)}
                });
                res.send(`회원가입 되었습니다.<br> <a href="/login">로그인하러 가기</a>`)
            }else{
                res.send('<script type="text/javascript">alert("회원가입 실패"); document.location.href="/join";</script>');
            }
        })
    }
    else {
        res.send('<script type="text/javascript">alert("아이디, 비밀번호, 이름을 입력하세요"); document.location.href="/join";</script>');
    }



})

export default joinRouter
