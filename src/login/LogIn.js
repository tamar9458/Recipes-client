
import { Link, useNavigate, useLocation } from "react-router-dom"
import SignUp from "./SignUp"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import HomePage from "../pages/HomePage"
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import * as Actions from "../store/action"
import Header from "../Header"
import 'semantic-ui-css/semantic.min.css'
import { useSelector } from "react-redux";
import { FormField, Form } from 'semantic-ui-react'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const schema = yup
    .object({
        userName: yup.string().required(),
        password: yup.string().min(3).required(),
    })
    .required()

export default function App() {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { state } = useLocation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { userName: state?.Username, password: state?.Password }
    })
    const onSubmit = (data) => {
        axios.post('http://localhost:8080/api/user/login',
            { Username: data.userName, Password: data.password })
            .then((d) => {
                console.log(d)
                dispatch({ type: Actions.SET_USER, user: d.data })
                alert(`HELLO ${data.userName}`)
                localStorage.setItem("user", JSON.stringify(d.data))
                navigate("/homepage")
            }).catch((error) => {
                alert(error.response.data)
                navigate("/signUp", { state: data })
            })
    }
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField style={{ width: '20%' }} label="User Name " {...register("userName")} error={!!errors.userName} helperText={errors.userName?.message} />
            <br />
          
            <TextField style={{ width: '20%' }} label="Password " {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
            <br />
            
            <br />
            <Link to={'/signUp'}>Don't have an account yet? Sign Up now</Link>
            <br />

            <Button variant="contained" color="primary" type="submit">Submit</Button>

        </form>

    )
}