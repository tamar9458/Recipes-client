import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from 'axios'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
//import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//import Image from '../images/s.jpg'
import Recipes from "./Recipes";
import { Add, Del, getAllBuies } from "../service/shopping";

//import 'semantic-ui-css/semantic.min.css'


export default () => {
    const { user, buies } = useSelector(state => ({
        user: state.user.user,
        buies: state.buy.buies
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        if (!buies.length) {
            dispatch(getAllBuies(user));
        }
    }, [])





    return <>
        shopping
        <div>
            {buies?.map((x, id) => (
                <div key={id}>
                    <div>{x.Name}</div>
                    <div>{x.Count}</div>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => { dispatch(Add(user, x, 1)) }}>
                        +
                    </Button> <Button variant="outlined" startIcon={<AddIcon />} onClick={() => { dispatch(Add(user, x,  - 1)) }}>
                        -
                    </Button> <Button variant="outlined" startIcon={<AddIcon />} onClick={() => { dispatch(Del(user, x)) }}>
                        I had
                    </Button>
                </div>
            ))}
        </div>

        {/* {buies?.map((x, id) => 
            <div key={id}>
                <div>{x.Name}</div>
                <div>{x.Count}</div>
                <button onClick={() => { Add(x,x.Count+1) }}>+</button>
                <button onClick={() => { Add(x,x.Count-1) }}>-</button>
                <button onClick={() => { Del(x) }}>I had</button>
            </div>
        )} */}
    </>
}