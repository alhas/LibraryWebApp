import { CircularProgress, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid'
import Popup from '../user/Popup';
import TheBookView from '../user/TheBookView';
import React, { useState, useEffect } from 'react';
import * as api from '../../api';
import EditBook from './EditBook';
import DeleteBook from './DeleteBook'


const cssStyle = makeStyles(theme => ({

    buttons: {

        marginLeft: '1em'

    }

}))

export default function AdminBookList() {



    const useStyle = cssStyle();

    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', width: 150, sortable: true },
        { field: 'author', headerName: 'Author', width: 150 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'language', headerName: 'Language', width: 150, sortable: true },
        {
            field: 'open', headerName: "Book", width: 250,
            renderCell: () => (
                <strong>
                    <Button onClick={() => setViewBook(true)}
                        variant="contained"
                        color="default"
                        size="small"
                        className={useStyle.buttons}
                    >
                        OPEN
                    </Button>
                    <Button onClick={() => setEditBook(true)}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={useStyle.buttons}
                    >
                        EDIT
                    </Button>

                    <Button onClick={() => setDeleteBook(true)}
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={useStyle.buttons}
                    >
                        DELETE
                    </Button>

                </strong>
            )
        }


    ]

    const [books, setBooks] = useState([]);
    const [book, setBook] = useState([]);
    const [getLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [viewBook, setViewBook] = useState(null);
    const [editBook, setEditBook] = useState(null);
    const [deleteBook, setDeleteBook] = useState(false);

    const fetchBooks = () => api.adminGetBooks().then(setBooks);


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

        <div style={{ marginTop: '5em' }}>
            <h1 style={{textAlign:'center'}}>Books List</h1>
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

            <Popup title={book.title} view={editBook} setView={setEditBook} >
                <EditBook id={book._id} />
            </Popup>

            <Popup  title={book.title} view={deleteBook} setView={setDeleteBook}>
                <DeleteBook  id={book._id} />
            </Popup>

        </div >
    );
}
