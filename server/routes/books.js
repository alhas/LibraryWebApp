import express from 'express';
import mongodb from 'mongodb';
import verify from './verifyToken.js';
import { getCollection } from '../DataBase.js'
import cookieParser from 'cookie-parser';


const router = express.Router();
router.use(cookieParser());

router.get('/books', verify, async (req, res) => {

    const booksCollection = getCollection('books');
    const getAllBooks = await booksCollection.find({}).toArray();
    res.send(getAllBooks);

});


router.get('/books/:id', async (req, res) => {
    const booksCollection = getCollection('books');

    const theBook = await booksCollection.findOne({ _id: mongodb.ObjectId(req.params.id) });

    theBook ? (res.send(theBook)) : (res.status(404).send("Not Found"))

});

//SET Arranged Books
router.post('/books/:id', verify, async (req, res) => {

    //Get Collections
    const booksCollection = getCollection('books');
    const usersCollection = getCollection('users');

    //get The Book
    const getBook = await booksCollection.findOne({ _id: mongodb.ObjectId(req.params.id) })

    const userId = mongodb.ObjectId(req.cookies['id'])

    const checkBook = await usersCollection.findOne(
        { $and: [{ _id: userId }, { takenBooks: { _id: mongodb.ObjectId(req.params.id) } }] }

    )

   


    const arrangeBook = () => {
        usersCollection.updateOne(
            { _id: userId },
            { $addToSet: { takenBooks: getBook } }
        )
    }

    if (!checkBook) {

        res.status(200).send(arrangeBook())

    } else if (checkBook.takenBooks) {

        res.status(400).send('Already In Your Basket')

    } else {

        res.status(200)

    }

})



router.get('/users/books', verify, async (req, res) => {

    const userCollection = getCollection('users');

    const userId = mongodb.ObjectId(req.cookies['id'])

    const getUserBooks = await userCollection.findOne(
        { _id: userId })

    if (getUserBooks) {
        res.send(getUserBooks.takenBooks)

    } else {

        throw new Error('Please try again')

    }
})

export default router;