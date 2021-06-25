import express from 'express'
import jwt from 'jsonwebtoken'
import { getCollection } from '../DataBase.js'
import bcrypt from 'bcryptjs'
import adminVerify from './adminVerifyToken.js'
import mongodb from 'mongodb';
import { bookValidation } from '../validation.js'
import { validationResult } from 'express-validator'
import cookieParser from 'cookie-parser'

const adminRouter = express.Router();
adminRouter.use(cookieParser());

adminRouter.get('/books', adminVerify, async (req, res) => {

    const booksCollection = getCollection('books');
    const getAllBooks = await booksCollection.find({}).toArray();
    res.send(getAllBooks);

});

adminRouter.get('/books/:id', adminVerify, async (req, res) => {
    const booksCollection = getCollection('books');

    const theBook = await booksCollection.findOne({ _id: mongodb.ObjectId(req.params.id) });

    theBook ? (res.send(theBook)) : (res.status(404).send("Not Found"))

});

adminRouter.post('/books', adminVerify, async (req, res) => {
    const booksCollection = getCollection('books');
    const newBook = req.body;
    console.log(newBook);

    try {
        await booksCollection.insertOne(newBook);
        res.status(201).send("Book Added.")

    } catch {
        err.send("Unexpected Error, Try again...");
    }
})

adminRouter.delete('/books/:id', adminVerify, async (req, res) => {
    const booksCollection = getCollection('books');
    const bookID = mongodb.ObjectID(req.params.id);
    const deleteBook = await booksCollection.deleteOne({ _id: bookID })


    if (deleteBook) {
        res.send(deleteBook)
        console.log(` ${bookID} Deleted`)

    } else if (!deleteBook) {

        res.status(404).send("Book is not found")
    } else {

        res.send('Invalid Error Please Try Again.')

    }


})

adminRouter.put('/books/:id', adminVerify, bookValidation(), async (req, res) => {

    const { errors } = validationResult(req)

    if (Object.keys(errors).length != 0) {

        return res.status(400).send(errors[0].msg);

    }

    const booksCollection = getCollection('books');
    const bookID = await mongodb.ObjectID(req.params.id)


    const { title, author, description, language } = req.body;
    const changes = { title, author, description, language }


    const book = await booksCollection.updateOne(
        { _id: bookID },
        { $set: changes },
    )

    if (book) {
        res.send("Book Updated")
    }
    else {
        res.status(404).send("Book ID not found.")

    }
})



adminRouter.post('/login', adminVerify, async (req, res) => {

    const adminCollection = getCollection('admin');

    //Checking admin
    const admin = await adminCollection.findOne({ email: req.body.email })
    if (!admin) return res.status(400).send('Not Found')

    //IS password Correct
    const validPass = await bcrypt.compare(req.body.password, admin.password)
    if (!validPass) return res.status(400).send('Invalid Password')

    //Admin Token
    const adminToken = jwt.sign({ _id: admin._id }, process.env.ADMIN_TOKEN_SECRET)
    res.cookie('adminAuthToken', adminToken, { expires: new Date(Date.now() * 900000 * 8), sameSite: 'none', secure: true, httpOnly: false })
    res.header('adminAuthToken', adminToken)
    res.send("admin Token")
});

adminRouter.get('/logout', async (req, res) => {

    res.cookie('adminAuthToken', 'remove', { maxAge: 0 })
    res.send('Cookie Deleted')

})

adminRouter.get('/users', adminVerify, async (req, res) => {

    const getUserCollection = getCollection('users')
    const getAllBooks = await getUserCollection.find({}).toArray();
    res.send(getAllBooks);

    if (!getAllBooks) {

        throw new Error('Please refresh the page.')

    }
})


adminRouter.get('/users/:id', adminVerify, async (req, res) => {


    const getUserCollection = getCollection('users')
    const userId = mongodb.ObjectID(req.params.id);
    const getUser = await getUserCollection.findOne(
        { _id: mongodb.ObjectId(req.params.id) }
    )
    res.send(getUser);

    if (!getUser) {
        throw new Error('Please try again...')
    }


})


export default adminRouter;