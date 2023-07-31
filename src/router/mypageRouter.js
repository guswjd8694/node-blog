import express from "express";

const mypageRouter = express.Router();

mypageRouter.get('/', (req, res) => {
    const userSession = req.session.user

    console.log(userSession)
    if(userSession){
        res.render('mypage', { user: userSession })
    }else{
        res.send(`로그인하삼ㅋ <a href="/login"></a>`);
    }
})

export default mypageRouter;