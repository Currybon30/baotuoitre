import React from "react";
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core';
import { AppBar } from '@material-ui/core';


const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <AppBar position='static' >
            <Typography align="center" gutterBottom style={{padding: '10px'}}>
                Copyright © {year} - All Rights Reserved
            </Typography>
        </AppBar>
    );
};


export default Footer;
