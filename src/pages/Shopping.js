import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from 'axios'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';//פלוס
import RemoveIcon from '@mui/icons-material/Remove';
import Recipes from "./recipe/Recipes";
import { Add, Del, getAllBuies } from "../service/shopping";//מינוס
import DeleteIcon from '@mui/icons-material/Delete';//פח
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';



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
        <div className="cards shop">
            {buies?.map((x, id) => (
                // <div key={id}>
                //     <div>{x.Name}</div>
                //     <div>{x.Count}</div>
                //     <Button variant="outlined" color="secondary" onClick={() => { dispatch(Add(user, x, x.Count + 1)) }}><AddIcon /></Button>
                //     <Button variant="outlined" color="secondary" onClick={() => { dispatch(Add(user, x, x.Count - 1)) }}><RemoveIcon /></Button>
                //     <Button variant="outlined" color="secondary" onClick={() => { dispatch(Del(user, x)) }}><DeleteIcon /></Button>
                // </div>
                <Card sx={{ maxWidth: 345 }} key={id} className="cardOne">
                    <CardHeader title={x.Name} subheader={`quantity: ${x.Count}`} />
                    {/* <CardMedia component="img" height="194" image={x.Img} alt={x.Name} /> */}
                    {/* <CardContent></CardContent> */}
                    <CardActions disableSpacing>
                        <Button variant="outlined" color="secondary" onClick={() => { dispatch(Add(user, x, x.Count + 1)) }}><AddIcon /></Button>
                        <Button variant="outlined" color="secondary" onClick={() => { dispatch(Add(user, x, x.Count - 1)) }}><RemoveIcon /></Button>
                        <Button variant="outlined" color="secondary" onClick={() => { dispatch(Del(user, x)) }}><DeleteIcon /></Button>                </CardActions>
                </Card>
            ))}
        </div>
    </>
}

