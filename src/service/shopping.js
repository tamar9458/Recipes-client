import axios from 'axios';


export const getAllBuies = (user) => {

    return dispatch => axios.get(`http://localhost:8080/api/bay/${user.Id}`)
        .then((res) => {
            dispatch({ type: "SET_BUY", data: res.data })
        })
        .catch((error) =>
            console.error(error)
        )
}

export const Del = (user, p) => {

    return dispatch => axios.post(`http://localhost:8080/api/bay/delete/${p.Id}`)
        .then(() => {
            dispatch({ type: "DELETE_BUY", data: { Name: p.Name, UserId: user.Id, Id: p.Id } })
        })
        .catch((error) =>
            console.error(error)
        )
}

export function Add(user, p, c) {
    return dispatch => {
        if (c <= 0) {
            dispatch(Del(user, p))
        }
        else {
            axios.post(`http://localhost:8080/api/bay`, { Name: p.Name, UserId: user.Id, Count: c })
                .then((x) => {
                    dispatch({ type: "EDIT_BUY", data: x.data })
                })
                .catch((error) =>
                    console.error(error)
                )
        }
    }

}