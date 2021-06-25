import React, { useEffect, useState } from 'react'
import {
    AutoForm,
    AutoField,
    ErrorsField,
    LongTextField,
    SubmitField
} from 'uniforms-material';
import { book as schema } from '../../schema/schemaBook'
import * as api from '../../api'
import { CircularProgress } from '@material-ui/core';

export default function EditBook(param) {

    const { id } = param;
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchBook = () => api.getTheBook(id).then(setBook);

    useEffect(() => {
        setLoading(true);
        fetchBook()
            .catch(setError)
            .finally(() => setLoading(false))
        // eslint-disable-next-line 
    }, [])


    const onSubmit = (data) => {
        console.log(data);
        const { _id, ...bookData } = data;
        setLoading(true);
        api
            .adminUpdateBook(_id, bookData)
            .then(() => fetchBook())
            .catch(setError)
            .finally(() => setLoading(false))
    }

    if (error && error.message) {
        return (
            <div>
                <h1 style={{ color: 'red', textAlign: 'center' }}>{error.message}</h1>
            </div>
        );
    }


    return (

        <div>
            {loading ? (
                <CircularProgress style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            ) : (

                <AutoForm schema={schema} model={book} onSubmit={onSubmit} >
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
