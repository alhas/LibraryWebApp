import express from 'express';
import cors from 'cors';
import client from './DataBase.js';
//Import Routes
import router from "./routes/books.js";
import authRouter from "./routes/auth.js"
import adminRouter from './routes/admin.js'

const app = express();

var whitelist = ["https://ambitious-ground-03a545c03.azurestaticapps.net",'http://localhost:3000','https://librarywebapp.azurewebsites.net']

var corsOptions = {
    function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors({

    origin: corsOptions,
    credentials: true,

}));


//Middleware
app.use(express.json());
//Route Middleware
app.use('/', router);
app.use('/user', authRouter);
app.use('/admin', adminRouter);


app.get('/home', (req, res) => {
    res.send(`Library_Web_App`)
});

const port = process.env.PORT || 4000;


app.listen(port, async () => {

    console.log(`Server is ready at ${port}`)

    client.connect(() => { console.log("DB Connection", client.isConnected()); });

});








