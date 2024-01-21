import axios from 'axios';
import Swal from 'sweetalert2'

export const setUser = (data, navigate) => {
    return dispatch => {

        if (data != null) {
            axios.post('http://localhost:8080/api/user/login',
                { Username: data.userName, Password: data.password })
                .then((d) => {
                    dispatch({ type: "SET_USER", user: d.data })
                    navigate("/homepage")
                    Swal.fire({
                        title: `Hello ${data.userName}`,
                        text: "we hope for you full enjoy .",
                        icon: "success"
                    })
                }).catch((error) => {
                    navigate("/signUp", { state: data })
                })
        }
        else {
            dispatch({ type: "SET_USER", user: null })
            navigate("../");
        }
    }
}
export const addUser = (data, navigate) => {

    axios.post('http://localhost:8080/api/user/sighin', {
        Username: data.Username,
        Password: data.Password,
        Name: data.Name, Phone: data.Phone, Email: data.Email,
        Tz: data.Tz
    })
        .then((d) => {
            navigate("/login", { state: data })
        })
        .catch((error) => {
            alert(error.response.data)
        })

}
