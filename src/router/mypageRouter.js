import express from "express";
import { sessions, sessionMiddleware } from "../session.js";
const mypageRouter = express.Router()

mypageRouter.use(sessionMiddleware);
mypageRouter.get('/', (req, res) => {
    if (req.headers.cookie) {
        const [, , privateKey] = req.headers.cookie.split('=');
        const userInfo = sessions[privateKey];

        res.render('mypage', {
            isLogin: true,
            userInfo,
        });
    } else {
        res.render('mypage', { isLogin: false });
    }
});

export default mypageRouter
