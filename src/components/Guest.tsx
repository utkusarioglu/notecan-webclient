import React, { useState, useContext, MouseEvent } from "react";
import { Auth } from "../context/firebase";
import { AuthContext } from "../context/Auth";

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      backgroundImage: 'url(/guest-bg.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    logo: {
        height: "60px"
    },
    paper: {
      margin: theme.spacing(8, 10),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyleft '}
            <Link color="inherit" href="http://www.utkusarioglu.com/">
                Utku Sarioglu
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

interface LoginFormProps {
    history: any[], // ! type needed here
}

function Guest(props: LoginFormProps) {

    const classes = useStyles();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleLogin = async (e: MouseEvent) => {
        e.preventDefault();
        try {
            Auth.signInWithEmailAndPassword(email, password);
            props.history.push("/")
        } catch (e) {
            alert(e);
        }
    }

    const { currentUser } = useContext(AuthContext);

    if(currentUser) {
        return <Redirect to="/" />
    }
    
    return (
        <Fade in={true}>

            <Grid container component="main" className={classes.root}>
                <Grid item xs={false} sm={4} md={7} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>

                        <img 
                            src="/logo.svg"
                            alt="NoteCan logo"
                            className={classes.logo} />

                        <form
                            className={classes.form}
                            noValidate>

                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>

                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={ email }
                                onChange={ (e) => setEmail(e.target.value) }/>

                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="password"
                                name="password"
                                type="password"
                                placeholder="password"
                                autoComplete="current-password"
                                value={ password }
                                onChange={ (e) => setPassword( e.target.value) } />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                />
                            
                            <Button
                                className={classes.submit}
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                onClick={ (e) => handleLogin(e) }>
                                Login
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                    Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>

                        </form>   

                        <Box mt={5}>
                            <Copyright />
                        </Box>

                    </div>
                </Grid>
            </Grid>
        </Fade>

    );

}

export default Guest
