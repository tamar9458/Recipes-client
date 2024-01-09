import * as Actions from './action'
import axios from 'axios';


const initalseState = {
    buies: [],
}
const reducerBuy = (state = initalseState, action) => {
    switch (action.type) {
        case "SET_BUY": {
            // axios.get(`http://localhost:8080/api/bay/:${action.data}`)
            //     .then((res) => { return { ...state, res } })
            //     .catch((error) => console.error(error))
            // const buies = state.buies.filter(x => x.userId === action.userId);
            const buies = state.buies.filter(x => x.userId === action.userId);
            return { ...state, buies }
        }
        
           case "ADD_BUY": {
            console.log("reducer", action.data);
            //axios.post(`http://localhost:8080/api/bay`, { Name: action.data.Name, UserId:action.data.user, Count: 1 })
               // .then((res) => {
                    const buies = [...state.buies];
                    console.log(buies)
                    buies.push(action.data);
                    console.log(action.data)
                    alert("נוסף בהצלחה!!!")
                    return { ...state, buies }
               // }).catch((error) => console.error(error))
        }
        case "EDIT_BUY": {
            //axios.post(`http://localhost:8080/api/bay/edit`,{Name: action.data.Name, UserId:action.data.user, Count: action.data.Count}).then((res) => {
                const buies = [...state.buies];
                console.log("edit: ", action?.data?.Count)
                const findIndex = buies.findIndex(x => x.Name === action.data.Name);
                buies[findIndex] = action.data;
                return { ...state, buies }
            //}).catch((error) => console.error(error))
          
        }
        case "DELETE_BUY": {
            console.log("delete: ", action.data)
            // const recipes = [...state.recipes];
            //axios.post(`http://localhost:8080/api/bay/delete/:${action.data.user}/:${action.data.Name}`)
               // .then(() => {
                const buies = [...state.buies];
                const findIndex = buies.findIndex(x => x.Name === action.data?.Name);
                buies.splice(findIndex,2);
                console.log("deleted!!!",buies)
                return { ...state ,buies}
                //})
                //.catch((error) => { console.error(error) })
        }
        
        default: return { ...state }
    }
}

// reducer({ type: "ADD", payload: "dvora", data: "lll" })

export default reducerBuy;