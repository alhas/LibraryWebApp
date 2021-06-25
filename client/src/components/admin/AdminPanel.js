import { Typography } from '@material-ui/core';
import React from 'react'
import AdminBookList from './AdminBookList.js';
import AdminHeader from './AdminHeader.js';
import AdminLogin from './AdminLogin.js';
import AdminUserList from './AdminUserList.js';



function AdminPanel() {

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? true : false;
    }

    if (!getCookie('adminAuthToken')) {
        return <div>

            <AdminLogin />

        </div>

    } else if (getCookie('adminAuthToken')) {
        return <div>

            <AdminHeader />
            <Typography variant={'h2'} style={{ marginTop: '2em', textAlign: 'center' }} >Admin </Typography>
            <AdminBookList />
            <AdminUserList />

        </div>

    }



    return (
        <div>





        </div>
    )
}

export default AdminPanel
