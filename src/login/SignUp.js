import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { TextField, Button } from '@mui/material';
import { addUser } from "../service/user"
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';//איש
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';//מייל
import CabinIcon from '@mui/icons-material/Cabin';//בית
import CallIcon from '@mui/icons-material/Call';//טלפון
import KeyIcon from '@mui/icons-material/Key';//מנעול
import FingerprintIcon from '@mui/icons-material/Fingerprint';//טביעת אצבע

let schema = yup
    .object({
        Username: yup.string().required(),
        Name: yup.string().required(),
        Adress: yup.string().required(),
        Email: yup.string().email().required(),
        Phone: yup.string().required(),
        Tz: yup.string().required(),
        Password: yup.string().required(),
    })
    .required()


export default function App() {
    const { state } = useLocation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { Username: state?.userName }
    })
    const navigate = useNavigate();

    const onSubmit = (data) => {
        addUser(data, navigate);
    }

    return (
        <div className="whiteBack signup">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField variant="outlined" style={{ width: '100%' }} label="User Name "
                    margin="dense" color="secondary"{...register("Username")}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>), }}
                    error={!!errors.Username} helperText={errors.Username?.message} />
                <br />
                <TextField variant="outlined" style={{ width: '100%' }} label="Name"
                    margin="dense" color="secondary" {...register("Name")}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>), }}
                    error={!!errors.Name} helperText={errors.Name?.message} />
                <br />
                <TextField variant="outlined" style={{ width: '100%' }} label="Adress"
                    margin="dense" color="secondary"{...register("Adress")}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><CabinIcon /></InputAdornment>), }}
                    error={!!errors.Adress} helperText={errors.Adress?.message} />
                <br />
                <TextField variant="outlined" style={{ width: '100%' }} label="Email"
                    margin="dense" type="email" color="secondary" {...register("Email")}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><AlternateEmailIcon /></InputAdornment>), }}
                    error={!!errors.Email} helperText={errors.Email?.message} />
                <br />
                <TextField variant="outlined" style={{ width: '100%' }} label="Phone"
                    margin="dense" color="secondary" minLength={9} maxLength={9} {...register("Phone")}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><CallIcon /></InputAdornment>), }}
                    error={!!errors.Phone} helperText={errors.Phone?.message} />
                <br />
                <TextField variant="outlined" style={{ width: '100%' }} label="Tz"
                    margin="dense" color="secondary"{...register("Tz")}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><FingerprintIcon /></InputAdornment>), }}
                    error={!!errors.Tz} helperText={errors.Tz?.message} />
                <br />
                <TextField variant="outlined" style={{ width: '100%' }} label="Password"
                    margin="dense" type="password" color="secondary" {...register("Password")}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><KeyIcon /></InputAdornment>), }}
                    error={!!errors.Password} helperText={errors.Password?.message} />
                <br />
                <Button variant="contained" color="secondary" type="submit">Submit</Button>

            </form>
        </div>
    )
}