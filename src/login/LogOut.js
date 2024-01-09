import { useDispatch } from "react-redux"
import * as Actions from '../store/action'
import { Link, useNavigate } from "react-router-dom"
import Login from './LogIn';

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
        <button onClick={()=>logOut()}>Log Out</button>

</>
}