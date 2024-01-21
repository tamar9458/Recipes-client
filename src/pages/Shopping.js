import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';//פלוס
import RemoveIcon from '@mui/icons-material/Remove';//מינוס
import DeleteIcon from '@mui/icons-material/Delete';//פח
import { Add, Del, getAllBuies } from "../service/shopping";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
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
                <Card sx={{ maxWidth: 345 }} key={id} className="cardOne">
                    <CardHeader title={x.Name} subheader={`quantity: ${x.Count}`} />
                    <CardActions disableSpacing>
                        <Button variant="outlined" color="secondary" onClick={() => { dispatch(Add(user, x, x.Count + 1)) }}><AddIcon /></Button>
                        <Button variant="outlined" color="secondary" onClick={() => { dispatch(Add(user, x, x.Count - 1)) }}><RemoveIcon /></Button>
                        <Button variant="outlined" color="secondary" onClick={() => { dispatch(Del(user, x)) }}><DeleteIcon /></Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    </>
}

