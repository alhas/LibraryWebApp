import jwt from 'jsonwebtoken';
import express from 'express';
import cookieParser from 'cookie-parser';


const app = express.Router();
app.use(cookieParser());



export default app.use((req, res, next) => {

    const adminAuthToken = req.cookies['adminAuthToken'];
    res.header("adminAuthToken", adminAuthToken)

    const token = req.headers['adminAuthToken'] = adminAuthToken;
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token")
    }
})

