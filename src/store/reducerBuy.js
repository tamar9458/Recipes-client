import * as Actions from './action'
import axios from 'axios';


const initalseState = {
    buies: [],
}
const reducerBuy = (state = initalseState, action) => {
    console.log('reducerBuy', state, action)
    switch (action.type) {
        case "SET_BUY": {
            const buies = action.data
            return { ...state, buies }
        }

        // case "ADD_BUY": {
        //     console.log("reducer", action.data);
            
        //     const buies = [...state.buies];
        //     buies?.push(action.data);
        //     return { ...state, buies }
        // }
        case "EDIT_BUY": {
            // const buies = [...state.buies];
            // buies.push(action.data);
            // return { ...state, buies}
            const buies = [...state.buies];
            let index = buies.findIndex(x => x.Name == action.data.Name)
            if (index == -1) {
                buies.push(action.data);
            }
            else {
                if (action.data.Count==0) { 
                    buies.splice(index, 1)
                }
                else {
                    buies[index] = action.data
                }
            }
            return { ...state, buies }

        }
        case "DELETE_BUY": {
            console.log("delete: ", action.data)
            
                const buies = [...state.buies];
                 const findIndex = buies.findIndex(x => x.Name === action.data?.Name);
                 buies.splice(findIndex,1);
            return { ...state ,buies}
        }

        default: return { ...state }
    }
}

// reducer({ type: "ADD", payload: "dvora", data: "lll" })

export default reducerBuy;