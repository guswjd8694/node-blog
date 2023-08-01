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
    if(!req.session.user){
        res.render('login')
    }else{
        res.send('<script type="text/javascript">alert("이미 로그인했잔여 ㅋ"); document.location.href="/";</script>')
    }
})
loginRouter.post('/', (req, res) => {
    const reqUserid = req.body.userid;
    const reqPassword = req.body.password;

    if(reqUserid && reqPassword){
        connection.query('select * from users where userid = ? and password = ?', [reqUserid, reqPassword] , (err, rows, fields) => {
            if(rows.length > 0){
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

                res.send(`로그인 성공~~ ^ ^⭐️ <a href="/mypage">마이페이지 긔긔</a>` )
            }
            else {
                res.send('<script type="text/javascript">alert("회원이.. 아닌거같은디요 -_-^ 오타겠조 =_=?"); document.location.href="/login";</script>');
            }
        })
    }
    else {
        res.send('<script type="text/javascript">alert("아뒤랑 비번을 입력하셔야조 -_-^"); document.location.href="/login";</script>');
    }
})
export default loginRouter