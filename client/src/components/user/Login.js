import { CircularProgress, makeStyles } from '@material-ui/core';
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
    }
}))

function Login() {

    const cssclasses = useStyle();

    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const login = (email, password) => {

        setLoading(true);
        api
            .login(email, password)
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

            <div>
                <AutoForm schema={schema} onSubmit={login}>
                    <AutoField name="email" />
                    <AutoField name="password" />
                    <ErrorsField />

                    {loginCheck()}

                    <SubmitField label="Login" className={cssclasses.loginButton} onClick={() => setError(null)} />
                </AutoForm >

            </div >

        )
    )
}


export default Login;