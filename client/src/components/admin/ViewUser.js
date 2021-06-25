import { CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import * as api from '../../api'

export default function ViewUser(param) {

    const { id } = param;
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const fetchUser = () => api.adminGetUser(id).then(setUser)

    console.log(user)

    useEffect(() => {
        fetchUser()
            .catch(setError)
        // eslint-disable-next-line 
    }, [])

    if (error && error.message) {
        return (
            <div>
                <h1 style={{ color: 'red', textAlign: 'center' }}> {error.message}</h1>
            </div>
        );
    }
    return (
        !user ? (
            <CircularProgress style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />

        ) : (
            <div>
                <Typography variant="h6" >User: {user.username}</Typography>
                {user.takenBooks.map((books) => (

                    <Typography>{books.title}</Typography>


                ))}
            </div>
        )
    )
}
