import axios from 'axios';

export const getAllCategories = () =>{
    return dispatch => {
        axios.get('http://localhost:8080/api/category')
        .then((c) => { 
            console.log("get all cats server",c.data);
        dispatch({type:"SET_CATEGORY" ,data:c.data})
        })
        .catch((error) =>
        console.error(error))
    }
}
export const AddCategory=(data)=>{
    return dispatch =>{
        axios.post('http://localhost:8080/api/category', { Name: data.Name })
        .then((d) => {
            dispatch({ type: "ADD_CATEGORY", data: d.data })
           // console.log("add cat 2", d)
        }).catch((error) => {
            console.error(error)
        })
    }
}