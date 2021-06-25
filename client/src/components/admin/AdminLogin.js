import { CircularProgress, Container, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';


import {
    AutoForm,
    AutoField,
    ErrorsField,
    SubmitField
} from 'uniforms-material';
import { bridge as schema } from '../../schema/schemaLogin';

import * as api from '../../api'

const useStyle = makeStyles(() => ({

    loginButton: {

        marginTop: "1em",
        backgroundColor: 'rgba(19, 245, 31, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(19, 245, 31, 0.9)'
        }
    },

    loginPaper: {
        marginTop: '10em',
        maxWidth: "25em",
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(0,0,0,0.1)',
        boxShadow:'0px 0px 10px 5px rgba(0,0,0,0.2)'
        
    }

}))


export default function AdminLogin() {



    const cssclasses = useStyle();

    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const adminLogin = (email, password) => {

        setLoading(true);
        api
            .adminLogin(email, password)
            .then(setEmail(email))
            .catch(setError)
            .finally(() => {
                setLoading(false);
            })



    }

    const loginCheck = () => {

        if (error && error.message) {

            return <div>
                <h1 style={{ color: 'red', textAlign: 'center' }}>{error.message}</h1>

            </div>


        } else if (email) {
            return <div>

                <h1 style={{ color: 'Green', textAlign: 'center' }}>Success</h1>

            </div>


        }


    }

    return (

        loading ? (

            <CircularProgress style={{

                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'

            }} />

        ) : (

            <Paper className={cssclasses.loginPaper}>


                <Container style={{ padding: '0.5rem' }}>
                    <h2>ADMIN LOGIN</h2>
                    <AutoForm schema={schema} onSubmit={adminLogin}>
                        <AutoField name="email" />
                        <AutoField name="password" />
                        <ErrorsField />

                        {loginCheck()}

                        <SubmitField label="Login" className={cssclasses.loginButton} onClick={() => setError(null)} />
                    </AutoForm >

                </Container >
            </Paper>
        )
    )
}

