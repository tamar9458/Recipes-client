import * as Actions from './action'
import axios from 'axios';


const initalseState = {
    buies: [],
}
const reducerBuy = (state = initalseState, action) => {
    switch (action.type) {
        case "SET_BUY": {
            
            const buies = state.buies.filter(x => x.userId === action.userId);
            return { ...state, buies }
        }
        
           case "ADD_BUY": {
            console.log("reducer", action.data);
            axios.post(`http://localhost:8080/api/bay`, { Name: action.data.Name, UserId:action.data.user, Count: 1 })
                .then((res) => {
                    const buies = [...state.buies];
                    buies?.push(action.data);
                    alert(`you add ${action.data.Name}`)
                    state={...buies};
                    
                }).catch((error) => console.error(error))
               return { ...state }
        }
        case "EDIT_BUY": {
            axios.post(`http://localhost:8080/api/bay`,{Name: action.data.Name, UserId:action.data.user, Count: action.data.Count})
            .then((res) => {
                const buies = [...state.buies];
                    buies.push(action.data);
                    state={...buies};                    
                })
            .catch((error) => console.error(error))
            return { ...state }
          
        }
        case "DELETE_BUY": {
            console.log("delete: ", action.data)
            // const recipes = [...state.recipes];
            axios.post(`http://localhost:8080/api/bay/delete/:${action.data.user}`)
                .then(() => {                     
                // const buies = [...state.buies];
                // const findIndex = buies.findIndex(x => x.Name === action.data?.Name);
                // buies.splice(findIndex,2);
                 console.log("deleted!!!",action.data.Name)
                // state={...buies}
               
                })
                .catch((error) => { console.error(error) }) 
                return null;
                return { ...state}
        }
        
        default: return { ...state }
    }
}

// reducer({ type: "ADD", payload: "dvora", data: "lll" })

export default reducerBuy;