import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux/es/hooks/useSelector"
import { Add } from '../../service/shopping'
import { useLocation } from 'react-router-dom'
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

export default () => {

    const user = useSelector(state => state.user.user);
    const { state } = useLocation();
    const props = state;
    const dispatch = useDispatch();

    return <>
        <Card sx={{ maxWidth: 345 }} className='cards show' >
            <CardHeader title={props?.Name} subheader={props?.Description} />
            <CardMedia component="img" height="194" image={props?.Img} alt={props?.Name} />
            <CardContent>
                <p>Category: {props?.CategoryId} ,
                    Duration: {props?.Duration} ,
                    Difficulty: {props?.Difficulty}</p>
            </CardContent>
            <CardContent>
                Ingrident: {props?.Ingrident.map((x, i) =>
                    <div key={i}>
                        <CardActions disableSpacing className='buy'>{x.Name} {x.Count} {x.Type}<Button variant="outlined" color="secondary" onClick={() => dispatch(Add(user, x, x?.Count))}>buy</Button></CardActions>
                    </div>)}
            </CardContent>
            <CardContent>
                Instructions: {props?.Instructions.map((x, i) => <div key={i}>{x}</div>)}
            </CardContent>
        </Card>
    </>
}