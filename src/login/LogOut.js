import { useDispatch } from "react-redux"
import * as Actions from '../store/action'
import { Link, useNavigate } from "react-router-dom"
import Login from './LogIn';
import 'semantic-ui-css/semantic.min.css'
import { useSelector} from "react-redux";
import { FormField, Form } from 'semantic-ui-react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default ()=>{

    const dispatch=useDispatch();
    const navigate = useNavigate();
    function logOut(){
        localStorage.setItem("user",null)
        dispatch({ type: Actions.SET_USER, user: null});
        navigate("../");
    }
return<>
        <Login/>
        <Button variant="outlined"  onClick={()=>logOut()}>
                   Log Out 
        </Button>
        {/* startIcon={<AddIcon />} */}

</>
}