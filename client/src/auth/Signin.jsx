import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { signin } from './api-auth.js';
import auth from './auth-helper.js';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from 'react-multi-date-picker/components/icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
      },
      submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
      }
}));

export default function Signin() {
    const classes = useStyles();
    const location = useLocation();
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });

    const clickSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: values.username || undefined,
            password: values.password || undefined
        };

        const response = await signin(user);
        if (response.error) {
            setValues({ ...values, error: response.error });
        } else {
            auth.authenticate(response, () => {
                setValues({ ...values, error: '', redirectToReferrer: true });
            });
            const logoutWarning = () => {
                setTimeout(() => {
                    alert('Phiên đăng nhập sẽ hết sau 5 phút nữa');
                }, 10500000); 
            }
            logoutWarning();
            auth.runLogoutTimer(10800000)
        }
    }

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    }

    const { from } = location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = values;
    if (redirectToReferrer) {
        return <Navigate to={from} />;
    }

    return (
        <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Đăng nhập
        </Typography>
        <TextField id="username" type="username" label="Username" className={classes.textField} value={values.username} onChange={handleChange('username')} margin="normal" autoFocus='true' /><br />
        <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal" />
        <br /> {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}
          </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
      </CardActions>
    </Card>
    )
}
