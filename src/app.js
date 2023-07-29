import express from 'express';
import joinRouter from "./router/joinRouter.js";

const app = express();
let port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.send('hello world')
});

app.post('/', (req, res) => {
    res.send('got a post request')
})

app.use('/join', joinRouter);



const server = app.listen(port, () => {
    console.log(`server on ${port}`)
});