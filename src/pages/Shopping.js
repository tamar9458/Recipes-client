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

//import 'semantic-ui-css/semantic.min.css'


export default () => {
    const [buies, setBuies] = useState([]);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const [needSetBuy, setNeedSetBuy] = useState(false);
    const [currentBuyId, setCurrentBuyId] = useState(-1);
    const [currentBuyCount, setCurrentBuyCount] = useState(-1);
    const [option, setOption] = useState("non")

    function getAllBuies() {
        axios.get(`http://localhost:8080/api/bay/${user.Id}`)
            .then((res) => { console.log(res.data); setBuies(res.data); })
            .catch((error) => console.error(error));
    }
    useEffect(() => {
        getAllBuies();
    }, [])


    function Del(p) {

        axios.post(`http://localhost:8080/api/bay/delete/${p.Id}`)
            .then(() => {
                getAllBuies();
            }).catch((error) => console.error(error))

        //    dispatch({ type: "DELETE_BUY", data: { Name: p.Name ,UserId:user.Id,Id:p.Id } })

    }
    function Add(p, c) {
        if (c == 0)
            Del(p)
        else {
            axios.post(`http://localhost:8080/api/bay`, { Name: p.Name, UserId: user.Id, Count: c }).then(() => {
                //// dispatch({ type: "EDIT_BUY", data: { Name: p.Name, Count: c } })
                getAllBuies();
            }).catch((error) => console.error(error))
        }

    }

    return <>
        shopping
        <div>
            {buies?.map((x, id) => (
                <div key={id}>
                    <div>{x.Name}</div>
                    <div>{x.Count}</div>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => { Add(x, x.Count + 1) }}>
                        +
                    </Button> <Button variant="outlined" startIcon={<AddIcon />} onClick={() => { Add(x, x.Count - 1) }}>
                        -
                    </Button> <Button variant="outlined" startIcon={<AddIcon />} onClick={() => { Del(x) }}>
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