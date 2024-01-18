import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux/es/hooks/useSelector"
import { Card } from 'semantic-ui-react'
import { Add } from '../../service/shopping'
import { useLocation } from 'react-router-dom'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default () => {

    const user = useSelector(state => state.user.user);
    // const buies = useSelector(state => state.buy.buies);
    const { state } = useLocation();
    const props = state;
    const dispatch = useDispatch();

    return <>
        <Card>
            <p>{props?.Name}</p>
            <p>Category: {props?.CategoryId}</p>
            <p>Description: {props?.Description}</p>
            <p>Duration: {props?.Duration}</p>
            <p>Difficulty: {props?.Difficulty}</p>
            Ingrident: {props?.Ingrident.map((x, i) =>
                <div key={i}>
                    <div>{x.Name} {x.Count} {x.Type}</div>
                    <Button variant="outlined" color="secondary" onClick={() => dispatch(Add(user, x, x?.Count))}>buy</Button>
                </div>)}
            Instructions: {props?.Instructions.map((x, i) => <div key={i}>{x}</div>)}

            <img src={props?.Img}></img>

        </Card>
    </>
}