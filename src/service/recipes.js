
import axios from 'axios';


export const getRecipes = (byUser, user) => {
    return dispatch => {
        if (!byUser) {
            axios.get(`http://localhost:8080/api/recipe`)
            .then((res) => {
                dispatch({ type: "SET_RECIPE", data: res.data })
            })
            .catch((error) =>
                console.error(error)
            )
        }
        else{
            axios.get('http://localhost:8080/api/recipe')
            .then((res) => {
                dispatch({ type: "SET_RECIPE_USER", userId: user.Id }) 
            })
            .catch((error) =>
                console.error(error)
            )
        }
    //      axios.get('http://localhost:8080/api/category')
    //      .then((c) => { 
    //         dispatch({type:"SET_CATEGORY" ,data:c})
    //      })
    //      .catch((error) =>
    //      console.error(error)
    //  )

    }
}

export const deleteRecipe = (user, r) => {

    return dispatch => axios.post(`http://localhost:8080/api/recipe/delete/${user.Id}`,r.Id)
        .then(() => {
            console.log('delete',r);
            dispatch({ type: "DELETE_RECIPE", data:r })
        }).catch((error) => console.error(error))

    //    

}

// export function editRecipe(user, r, c) {
//     return dispatch => {
//         if (c == 0)
//         deleteRecipe(user, r)
//         else {
//             axios.post(`http://localhost:8080/api/bay`, { Name: r.Name, UserId: user.Id, Count: c }).then(() => {
//                 dispatch({ type: "EDIT_BUY", data: { Name: r.Name, Count: c } })
//             }).catch((error) => console.error(error))
//         }
//     }

// }