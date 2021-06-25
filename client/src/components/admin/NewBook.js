import React from 'react'
import { useState } from 'react';
import {
    AutoForm,
    AutoField,
    ErrorsField,
    LongTextField,
    SubmitField
} from 'uniforms-material';
import { CircularProgress } from '@material-ui/core';
import * as api from '../../api'
import { book as schema } from '../../schema/schemaBook'

export default function NewBook() {


    const [message, setMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const addBook = (bookData) => {

        setLoading(true);
        api
            .adminAddBook(bookData)
            .then(setMessage(true))
            .catch(setError)
            .finally(() => {
                setLoading(false)

            })

    }




    if (error && error.message) {
        return (
            <div>
                <h1 style={{ color: 'red', textAlign: 'center' }}>{error.message}</h1>
            </div>
        );
    } else if (message) {
        return (
            <div>

                <h1 style={{ color: 'Green', textAlign: 'center' }} >Book Added</h1>

            </div>
        )

    }


    return (
        <div>
            {loading ? (
                <CircularProgress style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            ) : (

                <AutoForm schema={schema} onSubmit={addBook} >
                    {message}
                    <AutoField name="title" />
                    <AutoField name="author" />
                    <AutoField name="language" />
                    <LongTextField name="description" rows={5} />
                    <ErrorsField />
                    <SubmitField label="Save" />
                </AutoForm>
            )}
        </div >
    )
}
