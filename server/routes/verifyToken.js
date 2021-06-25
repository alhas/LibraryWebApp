import jwt from 'jsonwebtoken';
import express from 'express';
import cookieParser from 'cookie-parser';


const app = express.Router();
app.use(cookieParser());

export default app.use((req, res, next) => {

    const authToken = req.cookies['authToken'];
    res.header("authToken", authToken)

    const token = req.headers['authToken'] = authToken;
    if (!token) return res.status(401).send('Access Denied Please Log In');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token")
    }
})

