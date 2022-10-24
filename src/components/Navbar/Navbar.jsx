import React, {useEffect, useState} from 'react'
import {Link, useHistory, useLocation} from "react-router-dom";
import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import useStyles from './styles';
import memories from "../../images/memories.png";


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        console.log('wylogowano')
        dispatch({type: 'LOGOUT'});

        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align='center'>Something
                    Strange</Typography>
                <img className={classes.image} src={memories} alt='memories' height='60'/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name}
                                src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
                                {/*src={user.imageUrl}>{user.result.name.charAt(0)}</Avatar>*/}
                        <Typography className={classes.userName} variant='h6'>{user.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary'
                                onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to='/auth' variant="contained" color='primary'>Sign In</Button>
                    </div>)}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;