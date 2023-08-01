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
        connection.query('update users set deleted_at = "test", where userid = ?', sessionUserid, (err, result, fields) => {
            console.log(fields, result)
            res.redirect('/')
        } )
    }else{
        res.send('쩌 로그인부터 다시 하쇼 =ㅅ=')
    }
})

export default userDeleteRouter