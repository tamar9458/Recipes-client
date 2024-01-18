import axios from 'axios';

export const setUser = (data,navigate) => {
    return dispatch => {
        
        if(data!=null){
            console.log("submit 2",data);
        axios.post('http://localhost:8080/api/user/login',
            { Username: data.userName, Password: data.password })
            .then((d) => {
                dispatch({ type: "SET_USER", user: d.data })
                alert(`HELLO ${data.userName}`)
                navigate("/homepage")
            }).catch((error) => {
                alert(error.response.data)
                navigate("/signUp", { state: data })
            })
        }
        else{
            dispatch({ type: "SET_USER", user: null })
            navigate("../");
        }
    }
}
export const addUser = (data,navigate) => {

    axios.post('http://localhost:8080/api/user/sighin', {
        Username: data.Username,
        Password: data.Password,
        Name: data.Name, Phone: data.Phone, Email: data.Email,
        Tz: data.Tz
    })
        .then((d) => {
            console.log(d)
            navigate("/login", { state: data })
        })
        .catch((error) => {
            alert(error.response.data)

        })

}
