import express from "express"
import dotenv from "dotenv"
import path from "path";
import indexRouter from "./router/indexRouter.js";
import joinRouter from "./router/joinRouter.js";
import loginRouter from "./router/loginRouter.js";
import boardRouter from "./router/boardRouter.js";
import mypageRouter from "./router/mypageRouter.js";
import mysql from "mysql2";


dotenv.config()

const app = express()
const __dirname = path.resolve();

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
    console.log('conncted mysql')
})

connection.query('select name from users where name like "%달%"', (error, result, field) => {
    if (error) throw error

    console.log(result)
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/img'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter)
app.use('/join', joinRouter)
app.use('/login', loginRouter)
app.use('/board', boardRouter)
app.use('/mypage', mypageRouter)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`listing ${port} port`)
})