import { Button} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import * as api from '../../api'
import ViewUser from './ViewUser'
import { DataGrid } from '@material-ui/data-grid'
import { CircularProgress, makeStyles } from '@material-ui/core';
import Popup from '../user/Popup';

const cssStyle = makeStyles(theme => ({

    buttons: {

        marginLeft: '1em'



    }

}))

export default function AdminUserList() {

    const useStyle = cssStyle();

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [viewUser, setviewUser] = useState(false);
   /*  const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null); */
    const [getLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        { field: 'username', headerName: 'User Name', width: 150, sortable: true },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'hashedPassword', headerName: 'Password', width: 200 },
        { field: 'takenBooks', headerName: 'Books', width: 150, sortable: true },
        { field: 'date', headerName: 'SignUp Date', width: 200, sortable: true },
        {
            field: 'user', headerName: "User", width: 250,
            renderCell: () => (
                <strong>
                    <Button onClick={() => { setviewUser(true)}}
                        variant="contained"
                        color="default"
                        size="small"
                        className={useStyle.buttons}
                    >
                        OPEN
                    </Button>
                    <Button onClick={() => { }}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={useStyle.buttons}
                    >
                        EDIT
                    </Button>

                    <Button onClick={() => { }}
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


    const fetchUsers = () => api.adminGetUsers().then(setUsers);

    useEffect(() => {
        setLoading(true);
        fetchUsers()
            .catch(setError)
            .finally(() => {
                setLoading(false);
            })


        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if (error && error.message) {
        return (
            <div>
                <h1 className={useStyle.errorMessage} > {error.message} </h1>
            </div>
        )

    }



    return (
        <div style={{ marginTop: '5em' }}>
            <h1 style={{ textAlign: 'center' }} >User List</h1>
            {getLoading ? (
                <CircularProgress style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
            ) : (
                <DataGrid
                    rows={users}
                    getRowId={(row) => row._id}
                    columns={columns}
                    autoHeight
                    disableSelectionOnClick
                    onRowOver={(theRow) => {
                        setUser(theRow.row);
                    }}
                    
                />
                    
            )}

            <Popup title={user.userName} view={viewUser} setView={setviewUser} >

                <ViewUser id={user._id} />

            </Popup>

        </div>
    )
}
