import { Dialog, DialogContent, DialogTitle, makeStyles, Button } from '@material-ui/core';
import React from 'react'

const useStyle = makeStyles(theme => ({

    close: {
        position: 'absolute',
        right: '2px',
        top: '2px'
    }


}))

export default function Popup(props) {

    const cssClass = useStyle();

    const { title, children, view, setView } = props;

    return (

        <Dialog PaperProps={{style:{  backgroundColor: '#f0d4be', backgroundImage: 'linear-gradient(to bottom , #d8c195 20%, #2867a8)'}}} 
        open={view} maxWidth='xs'>
            <Button className={cssClass.close} variant="contained" onClick={() => setView(false)} color="secondary" size='small' >x</Button>
            <DialogTitle style={{marginTop:'1em'}} >
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{title}</div>
            </DialogTitle>

            <DialogContent dividers>
                {children}
            </DialogContent>

        </Dialog>


    )
}
