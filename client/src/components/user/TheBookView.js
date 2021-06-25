import { Button, makeStyles, Typography, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import * as api from '../../api'


const useStyle = makeStyles(() => ({

    container: {



    },
    button: {

        margin: '0 auto',
        display: 'block'
    }
}))

export default function TheBookView(param) {
    const cssClasses = useStyle();

    const { id } = param;


    const [book, setBook] = useState([]);
    const [getloading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAdded, setIsAdded] = useState(false);

    const fetchBook = () => api.getTheBook(id).then(setBook);

    const onSubmit = (id) => {
        const { _id } = id;
        setLoading(true);
        api
            .arrangeBook(_id)
            .catch(setError)
            .finally(() => {
                setLoading(false);
                setIsAdded(true)

            })
    }

    useEffect(() => {
        setLoading(true);
        fetchBook()
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
        // eslint-disable-next-line 
    }, []);

    if (error && error.message) {
        return (
            <div>
                <h1 style={{ color: 'red', textAlign: 'center' }}>{book.title} <br />{error.message}</h1>
            </div>
        );
    } else if (isAdded) {

        return <div>

            <h1 style={{ color: 'Green', textAlign: 'center' }}> {book.title} Added.. </h1>

        </div>

    }

    return (
        <>
            {getloading ? (
                <CircularProgress style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            ) : (
                <container container className={cssClasses.container}>
                    <Typography variant="h6" >Author: {book.author}</Typography>
                    <Typography variant="body1">{book.description}</Typography>
                    <Typography variant="overline">{book.language}</Typography>
                    <br />
                    <Button className={cssClasses.button}
                        variant="contained" color="primary"

                        onClick={() => onSubmit(book)}

                    > Rent The Book </Button>
                </container>

            )}
        </>
    )
}
