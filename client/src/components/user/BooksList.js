import { CircularProgress, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid'
import Popup from './Popup';
import TheBookView from './TheBookView';
import React, { useState, useEffect } from 'react';
import * as api from '../../api';

const styleCss = makeStyles(() => ({

    errorMessage: {

        margin: 'auto',
        left: '50%',
        marginTop: '5em',
        color: 'red',
        textAlign: 'center',
        backgroundColor: 'rgba(128,128,128, 0.1)',
        width: '30rem',
        borderRadius: '0.5rem',
        textShadow: '0.05rem 0.05rem black'

    }
}))

function BooksList() {

    const useStyle = styleCss();
    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', width: 150, sortable: true },
        { field: 'author', headerName: 'Author', width: 150 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'language', headerName: 'Language', width: 150, sortable: true },
        {
            field: 'open', headerName: "Book", width: 150,
            renderCell: () => (
                <strong>
                    <Button onClick={() => setViewBook(true)}
                        variant="contained"
                        color="primary"
                        size="small"
                    >

                        Open
                    </Button>
                </strong>
            )
        }
    ]

    const [books, setBooks] = useState([]);
    const [getLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [viewBook, setViewBook] = useState(null);
    const [book, setBook] = useState([]);

    const fetchBooks = () => api.getBooks().then(setBooks);


    useEffect(() => {
        setLoading(true);
        fetchBooks()
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (error && error.message) {
        return (
            <div>
                <h1 className={useStyle.errorMessage} > {error.message} </h1>
            </div>
        )

    }

    return (


        <div style={{ marginTop: '5rem', maxWidth: '75%', position: 'relative', marginLeft: 'auto', marginRight: 'auto' }} >
            {getLoading ? (
                <CircularProgress style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            ) : (
                    <DataGrid
                        rows={books}
                        getRowId={(row) => row._id}
                        columns={columns}
                        autoHeight
                        disableSelectionOnClick
                        onRowOver={(theRow) => {
                            setBook(theRow.row);
                        }}
                    />
               
            )}

            <Popup title={book.title} view={viewBook} setView={setViewBook} >

                <TheBookView id={book._id} />

            </Popup>

        </div>


    );

}

export default BooksList;