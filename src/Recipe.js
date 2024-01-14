import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux/es/hooks/useSelector"
import 'semantic-ui-css/semantic.min.css'
import {Card} from 'semantic-ui-react'
import { Add } from './service/shopping'
import { useLocation } from 'react-router-dom'
export default ()=>{

    const user = useSelector(state => state.user.user);
    // const buies = useSelector(state => state.buy.buies);
    const {state}=useLocation();
    const props=state;
    const dispatch=useDispatch();

    return <>
    <Card>
        {console.log(props)}
    <p>{props?.Name}</p>
    <p>Category: {props?.CategoryId}</p>
    <p>Description: {props?.Description}</p>
    <p>Duration: {props?.Duration}</p>
    <p>Difficulty: {props?.Difficulty}</p>
    Ingrident: {props?.Ingrident.map((x,i)=>
        <div key={i}>
            <div>{x.Name} {x.Count} {x.Type}</div>
            {/* <button onClick={()=>AddToBuy(x.Name)}>buy</button> */}
            <button onClick={()=>dispatch(Add(user,x,x?.Count))}>buy</button>
        </div>)}
    Instructions: {props?.Instructions.map((x,i)=><div key={i}>{x}</div>)}
  
    <img src={props?.Img}></img>
    
    </Card>
    </>
}