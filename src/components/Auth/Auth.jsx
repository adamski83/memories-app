import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";

import {GoogleLogin} from '@react-oauth/google'
import {useDispatch} from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from './style'
import Input from "./Input";
import avatar from '../../images/IMG_20220515_101037.jpg';
import {signin, signup} from '../../actions/auth';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};


const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)

        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    };


    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const switchMod = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };
    const googleSuccess = async (res) => {
        const name = 'Adam';
        const imageUrl = avatar;
        const token = '87fd65g8yro832j94f75j987jf04527h4f25j4fsdjkff43fnf847n242p[5n740975bvg20[nv5740927bv50[734bv354blkjsdbfakjsdbfb';
        const clientId = res?.clientId;
        console.log(res)


        try {
            dispatch({type: 'AUTH', data: {name, token, clientId, imageUrl}});
            history.push('/');
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant='h5'> {isSignup ? 'Sign Up' : 'Sing In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
                        <Input name='password' label='Password' handleChange={handleChange}
                               type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange}
                                            type='password'/>}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary'
                            className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'} >
                    </Button>
                    <GoogleLogin
                        onSuccess={googleSuccess}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMod}>
                                {isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
};

export default Auth;