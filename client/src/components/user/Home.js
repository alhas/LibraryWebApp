import { Paper, Typography} from '@material-ui/core';
import React from 'react';
import libraryPhoto from '../../images/libraryPhoto.jpg';



const Home = () => (

    <Paper elevation='4' style={{ padding: '2em', margin: '2em',  textAlign: 'center',position:'relative', top:'5em', backgroundColor:'rgba(0,0,0,0.1)'}}>
           
        <Typography variant="h4" style={{color:'#E7A96F', textShadow:'1px 5px #071D1D',marginBottom:'1rem'}} >Library Web APP</Typography>

        <img src={libraryPhoto} alt="Library" style={{width:'100%', height:'auto',maxWidth:'auto', borderRadius:'1rem'}}/>
      

    </Paper>
);

export default Home;



