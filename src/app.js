import express from "express"
import dotenv from "dotenv"
import path from "path";
import indexRouter from "./router/indexRouter.js";
import joinRouter from "./router/joinRouter.js";
import loginRouter from "./router/loginRouter.js";
import boardRouter from "./router/boardRouter.js";
import mypageRouter from "./router/mypageRouter.js";
import {sessionMiddleware, sessions} from "./session.js";


dotenv.config()

const app = express()
const __dirname = path.resolve();


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
app.use(sessionMiddleware)


const port = process.env.PORT
app.listen(port, () => {
    console.log(`listing ${port} port`)
})

