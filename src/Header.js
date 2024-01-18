import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux";
import * as Actions from "./store/action"
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom"

export default function ({ prop }) {
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    return <>
        {!user ?
            <div>
                <Button variant="outlined" color="secondary" onClick={() => { navigate('/login') }}>Log in</Button>
                <Button variant="outlined" color="secondary" onClick={() => { navigate('/signUp') }}>Sign Up</Button>
            </div> :
            <div>
                <Button variant="outlined" color="secondary" onClick={() => { navigate('/homePage') }}>Home Page</Button>
                <Button variant="outlined" color="secondary" onClick={() => { navigate('/recipe') }}> Recipes </Button>
                <Button variant="outlined" color="secondary" onClick={() => { navigate('/recipe/:user') }}>My Recipes </Button>
                <Button variant="outlined" color="secondary" onClick={() => { navigate('/shopping') }}>Shopping</Button>
                <Button variant="outlined" color="secondary" onClick={() => { navigate('/logOut') }}>Change user</Button>

            </div>
        }
    </>
}