import { useSelector } from "react-redux/es/hooks/useSelector"
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom"

export default function ({ prop }) {
    
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();

    return <>
        <div className="header">
            {!user ?
                <div>
                    <Button variant="outlined" color="secondary" onClick={() => { navigate('/login') }}>Log in</Button>
                    <Button variant="outlined" color="secondary" onClick={() => { navigate('/signUp') }}>Sign Up</Button>
                </div> :
                <div>
                    <Button variant="outlined" color="secondary" onClick={() => { navigate('/homePage') }}>Home</Button>
                    <Button variant="outlined" color="secondary" onClick={() => { navigate('/recipe') }}> Recipes </Button>
                    <Button variant="outlined" color="secondary" onClick={() => { navigate('/recipe/:user') }}>My Recipes </Button>
                    <Button variant="outlined" color="secondary" onClick={() => { navigate('/shopping') }}>Shopping</Button>
                    <Button variant="outlined" color="secondary" onClick={() => { navigate('/logOut') }}>Change user ({user?.Name})</Button>

                </div>
            }
        </div>
    </>
}