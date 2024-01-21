import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Login from './LogIn';
import { Button } from '@mui/material';
import { setUser } from "../service/user";

export default () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logOut() {
        dispatch(setUser(null, navigate))
    }
    return <>
        <div className="whiteBack logout"><Login />
            <Button variant="contained" color="secondary" onClick={() => logOut()}>
                Log Out
            </Button></div>

    </>
}