import { Button, CircularProgress } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import * as api from '../../api'

export default function DeleteBook(param) {

    const { id } = param;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(false);

    const deleteBook = (id) => {
        setLoading(false);
        api
            .adminDeleteBook(id)
            .then(setMessage(true))
            .catch(setError)
            .finally(() => {

                setLoading(true);

            })
    }


    if (error && error.message) {
        return (
            <div>
                <h1 style={{ color: 'red', textAlign: 'center' }} > {error.message} </h1>
            </div>
        )

    } else if (message) {
        return <div>

            <h1 style={{ color: 'Green', textAlign: 'center' }}>Success</h1>

        </div>


    }


    return (
        <div>
            {loading ? (
                <CircularProgress style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />

            ) : (
                <div>
                    <h2 style={{ textAlign: 'center' }}>Are You Sure?</h2>
                    <Button onClick={() => deleteBook(id)} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} variant='contained' color='secondary'>
                        Delete
                </Button>
                </div>
            )}

        </div>
    )
}
