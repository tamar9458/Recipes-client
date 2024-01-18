import axios from 'axios';

export const getAllCategories = () => {
    return dispatch => {
        axios.get('http://localhost:8080/api/category')
            .then((c) => {
                dispatch({ type: "SET_CATEGORY", data: c.data })
            })
            .catch((error) =>
                console.error(error))
    }
}
export const addCategory = (data) => {
    return dispatch => {
        axios.post('http://localhost:8080/api/category', { Name: data.Name })
            .then((d) => {
                dispatch({ type: "ADD_CATEGORY", data: d.data })
                dispatch(getAllCategories())
            }).catch((error) => {
                console.error(error)
              })
    }
}