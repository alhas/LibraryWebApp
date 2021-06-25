import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import LoginIcon from "@material-ui/icons/AccountBox";
import SignUpIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton, makeStyles, Typography } from '@material-ui/core';
import * as api from '../../api'
import Login from './Login';
import Popup from './Popup';
import SignUp from './SignUp';
import Basket from './Basket';


const useStyle = makeStyles(theme => ({
    HeaderNav: {

        fontSize: '20px',
        margin: '10px',
        color: 'white',
        textDecoration: 'none',
        transition: '0.3s',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'rgba(128,128,128,0.1)',
            borderRadius: '5px',
            color: '#113963'
        },


    },
    header: {
        backgroundColor: 'rgb(128,128,128)',
        backgroundImage: 'linear-gradient(to top right, #d8c195 1%, #113963 )'
    },

    button: {
        position: 'fixed',
        right: '2em',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'black',
        borderRadius: '5px',
        transition: '0.3s',
        '&:hover': {

            color: 'white'
        }

    },

    buttonText: {
        paddingTop: '5px'


    }
}))


function Header() {

    const classes = useStyle();

    const [viewLogin, setViewLogin] = useState(false);
    const [viewSignUp, setSignUp] = useState(false);
    const [viewBasket, setViewBasket] = useState(false);


    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? true : false;
    }

    const UserButtons = () => {

        if (!getCookie('authToken')) {
            return <>

                <IconButton className={classes.button} onClick={() => setSignUp(true)}>
                    <SignUpIcon fontSize="large" />
                    <div className={classes.buttonText}>SIGN UP</div>
                </IconButton>

                <IconButton className={classes.button} onClick={() => setViewLogin(true)} style={{ right: '10em' }} >
                    <LoginIcon fontSize="large" />
                    <div className={classes.buttonText}>LOGIN</div>
                </IconButton>
            </>

        } else {

            return <>
                <IconButton className={classes.button} style={{ right: '12em' }} onClick={() => setViewBasket(true)} >
                    <ShoppingBasketIcon fontSize='large' />
                </IconButton>

                <IconButton className={classes.button} onClick={() => api.logOut()}>
                    <ExitToAppIcon fontSize="large" />
                    <div className={classes.buttonText}>LOG OUT</div>
                </IconButton>

            </>
        }
    }


    return <>
        <AppBar>
            <Toolbar className={classes.header} >

                <Typography className={classes.HeaderNav} component={Link} to="/" >HOME</Typography>

                <Typography className={classes.HeaderNav} component={Link} to="/books"  >BOOKS</Typography>

                {UserButtons()}

            </Toolbar>

        </AppBar >

        <Popup title={<div>Basket</div>} view={viewBasket} setView={setViewBasket} >

            <Basket />

        </Popup>


        <Popup title={<div>Sign Up</div>} view={viewSignUp} setView={setSignUp} >

            <SignUp />

        </Popup>

        <Popup title={<div>Login</div>} view={viewLogin} setView={setViewLogin} >
            <Login />
        </Popup>
    </>
};



export default Header;
