import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Image from '../images/img.jpg'
import axios from 'axios'
import Recipe from '../Recipe';
import { useNavigate ,useLocation} from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from "react-hook-form"
import * as yup from "yup"
//import 'semantic-ui-css/semantic.min.css'
import { FormField, Form } from 'semantic-ui-react'
import AddCategory from './AddCategory';

export default () => {
    const [buies,setBuies]=useState([]);
    const [needSetBuy,setNeedSetBuy]=useState(false);
    const [currentBuyId,setCurrentBuyId]=useState(-1);
    const [currentBuyCount,setCurrentBuyCount]=useState(-1);
    const [option,setOption]=useState("non")
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("user",user);
        console.log("userId",user.Id);
        axios.get(`http://localhost:8080/api/bay/${user.Id}`)
        .then((res) => {
              setBuies(res.data); 
            })
        .catch((error) => console.error(error));

         //dispatch({ type: "SET_BUY", data: user.Id });
    }, [])
    useEffect(() => {
        if(needSetBuy){
            let newBuies=buies;
            let index=newBuies.findIndex(x=>x.Id===currentBuyId);
            if(option==="del"){
                newBuies.splice(index,1);
            }
            else if(option==="add"||option==="sub"){            
                newBuies[index].Count=currentBuyCount;
            } 
            setBuies(newBuies);
            setNeedSetBuy(false);
        }

    }, [currentBuyId])
    //  function Set
       
    // }
    function Del(p){

        axios.post(`http://localhost:8080/api/bay/delete/:${p.Id}`).then(()=>{
            dispatch({ type: "DELETE_BUY", data: { Name: p.Name ,UserId:user.Id,Id:p.Id } })
            setOption("del")
            setNeedSetBuy(true)
            setCurrentBuyId(p.Id)
            console.log("del after dispatc",buies);
        })
       

    }
    function Add(p,c){
        if(c==0)
            Del(p)
        else {
        axios.post(`http://localhost:8080/api/bay`,{ Name: p.Name, UserId:user.Id, Count: c }).then(()=>{
            dispatch({ type: "EDIT_BUY", data: { Name: p.Name, Count: c } })
            if(c<p.Count)
                setOption("sub")
            else 
                setOption("add")
            setCurrentBuyCount(c)
            setNeedSetBuy(true)
            setCurrentBuyId(p.Id)
            console.log("add after dispatc",buies);
        })
        }
       
    }
   
    return <>
        shopping

        {buies?.map((x, id) => 
            <div key={id}>
                <div>{x.Name}</div>
                <div>{x.Count}</div>
                <button onClick={() => { Add(x,x.Count+1) }}>+</button>
                <button onClick={() => { Add(x,x.Count-1) }}>-</button>
                <button onClick={() => { Del(x) }}>I had</button>
            </div>
        )}
    </>
}