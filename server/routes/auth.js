import express from 'express';
import { } from "dotenv/config";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getCollection } from '../DataBase.js';
import { validationResult } from 'express-validator';
import { registerValidation, loginValidation } from '../validation.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

const authRouter = express.Router();


authRouter.post('/register', registerValidation(), async (req, res) => {

    const userCollection = getCollection('users');

    //Checking Errors
    const { errors } = validationResult(req);
    if (Object.keys(errors).length != 0) {
        return res.status(400).send(errors[0].msg);

    }

    //Checking if the user is already in the database
    const emailExist = await userCollection.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send("Email already exist");

    }

    //Hashing password salt
    const salt = await bcrypt.genSalt(10);

    //Create a new User
    const { username,
        email,
        hashedPassword = await bcrypt.hash(req.body.password, salt),
        takenBooks = [],
        date = new Date().toISOString()
    } = req.body;

    const newUser = { username, email, hashedPassword, takenBooks, date };
    console.log(newUser)

    try {

        const saveUser = await userCollection.insertOne(newUser);
        res.send({ UserId: saveUser.insertedId });

    } catch (err) {

        res.status(400).send(err)

    }
});

//Login
authRouter.post('/login', loginValidation(), async (req, res) => {

    //Checking Errors
    const { errors } = validationResult(req);

    if (Object.keys(errors).length != 0) {

        return res.status(400).send(errors[0].msg);

    }
    const userCollection = getCollection('users');

    //Checking email is exist
    const user = await userCollection.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email is not found");

    //Is Password Correct
    const validPass = await bcrypt.compare(req.body.password, user.hashedPassword);
    if (!validPass) return res.status(400).send('Invalid Password')

    //userId
    const userId = user._id
    res.cookie('id', userId, { expires: new Date(Date.now() + 900000 * 8), sameSite: 'none', secure: true, httpOnly: false })

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.cookie("authToken", token, { expires: new Date(Date.now() + 900000 * 8), sameSite: 'none', secure: true, httpOnly: false })
    res.header("authToken", token)
    res.send("Cookie Set")

});

authRouter.get('/logout', async (req, res) => {

    res.cookie('authToken', 'remove', { maxAge: 0 })
    res.send('Cookie Deleted')

})


export default authRouter;