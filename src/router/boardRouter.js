import express from "express";
import { sessions, sessionMiddleware } from "../session.js";
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

const boardRouter = express.Router()
boardRouter.use(sessionMiddleware)
boardRouter.get('/', (req, res) => {
    connection.query('select * from board', (err, rows) => {
        if (err) throw err;

        res.render('board', {rows})
    })
})

boardRouter.get('/write', (req, res) => {
    res.render('write')

})

boardRouter.post('/', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    const param = [title, contents]

    connection.query('select * from board', (err, rows) => {
        if (err) throw err;

        connection.query('insert into board(title, contents) values (?, ?)', param, (err, data) => {
            if(err) throw err;
        })

        res.render('board')
    })




})
export default boardRouter