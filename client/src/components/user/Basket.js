import { Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import * as api from '../../api'


const cssStyle = makeStyles(() => ({

    paper: {
        backgroundColor: 'rgba(128,128,128,0.1)',
        marginTop: '1em'
    },

    bookButtons: {

        maxWidth: '30px',
        maxHeight: '20px',
        minWidth: '30px',
        minHeight: '20px',
        float: 'right'
    }

}))

export default function Basket(books) {

    const useStyle = cssStyle();


    const [bookList, setBookList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchArrangedBooks = () => api.getArrangedBooks().then(setBookList)

    useEffect(() => {
        setLoading(true)
        fetchArrangedBooks()
            .catch(setError)
            .finally(() => {
                setLoading(false)
                console.log(bookList)

            })
        // eslint-disable-next-line 
    }, [])

    if (error && error.message) {
        return (
            <div>
                <h1 style={{ color: 'red', textAlign: 'center' }}> {error.message}</h1>
            </div>

        )
    }

    return (

        loading ? (
            <CircularProgress style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
        ) : (
            <div>
                <Typography variant={'h4'}>Your Books</Typography>
                {bookList.map((book) => (
                    <Paper className={useStyle.paper}>

                        <Typography >{book.title}
                            <Button className={useStyle.bookButtons} variant="contained" color="secondary" size="small" >x</Button>

                        </Typography>


                    </Paper>

                ))}

            </div >

        ))

}
