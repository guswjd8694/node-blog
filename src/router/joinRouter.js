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

const joinRouter = express.Router()
joinRouter.get('/', (req, res, next) => {
    res.render('join')
})

joinRouter.post('/', (req, res) => {
    const name = req.body.name;
    const userid = req.body.userid;
    const password = req.body.password;
    const birth = req.body.birth;
    const gender = req.body.gender;
    const email = req.body.email;
    const hp = req.body.hp;

    connection.query('insert into users(name, userid, password, birth, gender, email, hp) values("?", "?", "?", "?", "?", "?", "?")')
    res.send('디비를 확인해봐요')
})

export default joinRouter
