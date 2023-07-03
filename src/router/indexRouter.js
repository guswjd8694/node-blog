import express from "express";
import { sessions, sessionMiddleware } from "../session.js";

const indexRouter = express.Router()
indexRouter.use(sessionMiddleware)
indexRouter.get('/', (req, res, next) => {
    if (req.headers.cookie) {
        const [, , privateKey] = req.headers.cookie.split('=');
        const userInfo = sessions[privateKey];

        res.render('index', {
            isLogin: true,
            userInfo,
        });
    } else {
        res.render('index', { isLogin: false });
    }
})

export default indexRouter