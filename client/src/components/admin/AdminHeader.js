import { IconButton, makeStyles} from '@material-ui/core'
import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import * as api from '../../api'
import { useState } from 'react';
import NewBook from './NewBook';
import Popup from '../../components/user/Popup'



const cssStyle = makeStyles(theme => ({

    header: {
        backgroundColor: 'rgb(128,128,128)',
        backgroundImage: 'linear-gradient(to right, #093A5A 1%, #95C8D8 )'
    },

    button: {
        position: 'fixed',
        right: '2em',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'black',
        borderRadius: '5px'

    },

    buttonText: {
        paddingTop: '5px'


    }

}))


export default function AdminHeader() {

    const useStyle = cssStyle();
    const [newBook, setNewBook] = useState(false);


    return (
        <div>
            <AppBar>
                <Toolbar className={useStyle.header} >

                    <IconButton
                        style={{ color: 'white', fontSize: '1.5rem', border: '1px solid', borderRadius: '5px' }}

                        onClick={() => setNewBook(true)}  >

                        <AddBoxIcon fontSize='inherit' />
                        <div>ADD BOOK</div>

                    </IconButton>

                    <IconButton className={useStyle.button} onClick={() => api.adminLogOut()}>
                        <ExitToAppIcon fontSize="large" />
                        <div className={useStyle.buttonText}>LOG OUT</div>
                    </IconButton>

                </Toolbar>

            </AppBar>

            <Popup title={<div>New Book</div>} view={newBook} setView={setNewBook} >
                <NewBook />
            </Popup>

        </div>
    )
}
