
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"
import { useDispatch } from "react-redux"
import FingerprintIcon from '@mui/icons-material/Fingerprint';//טביעת אצבע
import AccountCircle from '@mui/icons-material/AccountCircle';//איש
import InputAdornment from '@mui/material/InputAdornment';
import { TextField, Button } from '@mui/material';
import { setUser } from "../service/user"

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
        dispatch(setUser(data, navigate))

    }
    return (
        <div className="whiteBack login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField style={{ width: '100%' }} label="User Name "
                    margin="dense" {...register("userName")}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>), }}
                    error={!!errors.userName} helperText={errors.userName?.message} />
                <br />

                <TextField style={{ width: '100%' }} label="Password "
                    margin="dense" type="password" {...register("password")}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><FingerprintIcon /></InputAdornment>), }}
                    error={!!errors.password} helperText={errors.password?.message} />
                <br />

                <br />

                <Button variant="contained" color="secondary" type="submit">Submit</Button>
                <br />
                <Link to={'/signUp'}>Don't have an account yet? Sign Up now</Link>

            </form>
        </div>
    )
}