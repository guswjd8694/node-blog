import express from "express";
import mysql from "mysql2";

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '01281028',
    port : '3306',
    database : 'dallae'
})
connection.connect();

const userDeleteRouter = express.Router();
userDeleteRouter.get('/', (req, res) => {
    const sessionUserid = req.session.user.userid
    if(sessionUserid){
        connection.query(`update users set deleted_at = CURRENT_TIMESTAMP where userid = ?`, [sessionUserid], (err, result, fields) => {
            if(err) {
                res.send('<script type="text/javascript">alert("머가 잘 안되나보네요..."); document.location.href="/mypage";</script>')
            }
            else {
                res.send('<script type="text/javascript">alert("ㅜ ㅜ 꺼저라 흥"); document.location.href="/";</script>')
            }
        } )
    }else{
        res.send('쩌 로그인부터 다시 하쇼 =ㅅ=')
    }
})

export default userDeleteRouter