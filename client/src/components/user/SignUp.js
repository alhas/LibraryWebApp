import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import {
    AutoForm,
    AutoField,
    ErrorsField,
    SubmitField
} from 'uniforms-material'
import { schemaSighUp as schema } from '../../schema/schemaSignUp';
import * as api from '../../api'



const useStyle = makeStyles(() => ({

    signUpButton: {

        marginTop: "1em",
        backgroundColor: 'rgba(19, 245, 31, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(19, 245, 31, 0.9)'
        }
    },

    warning: {
        backgroundColor: "rgba(128,128,128,0.1)",
        borderRadius: "5px",
        textAlign: 'center',
        display: 'inline-block',
        color:'red'


    }
}))
function SignUp() {


    const [getFirst, setFirst] = useState(null);
    const [getSecond, setSecond] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [getError, setError] = useState(null);

    const cssStyle = useStyle();

    const addUser = (userName, email, password) => {

        setLoading(true);
        api
            .register(userName, email, password)
            .then(setUser(userName))
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
    }

    const signUpCheck = () => {


        if (getError && getError.message) {
            return (
                <div>
                    <h1 style={{ color: 'red', textAlign: 'center' }}>{getError.message}</h1>
                </div>
            );
        } else if (user) {
            return (
                <div>

                    <h1 style={{ color: 'green', textAlign: 'center' }} >Account Created Can Log In </h1>

                </div>
            );

        }


    }

   


    const passwordCompare = () => {

        if (getFirst !== getSecond) return <Typography className={cssStyle.warning} >Passwords doesn't match</Typography>

    }


    return (

        loading ? (

            <CircularProgress
                style={{

                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'

                }}

            />

        ) : (

            < div >
                <AutoForm schema={schema} onSubmit={addUser} >
                    <Typography className={cssStyle.warning} variant="body2">Email address should valid.
                    User name mininum 4 and Password should be mininum 6 characters.</Typography>
                    <AutoField name='email' />
                    <AutoField name='username' />
                    <AutoField name='password' onInput={e => setFirst(e.target.value)} />
                    <AutoField name='passwordCheck' onInput={e => setSecond(e.target.value)} />
                    <div>{passwordCompare()}</div>
                    <ErrorsField />

                        {signUpCheck()}

                    <SubmitField label="SignUp" className={cssStyle.signUpButton} onClick={()=> setError(null)} />
                </AutoForm>



            </div >

        )
    )
}

export default SignUp;