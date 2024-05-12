import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core';
import { AppBar } from '@material-ui/core';


const Footer = () => {

    return (
        <AppBar position='static' >
            <Typography align="center" gutterBottom style={{padding: '10px'}}>
                Copyright © 2024 - All Rights Reserved
            </Typography>
        </AppBar>
    );
};


export default Footer;
