
const initalseState = {
    buies: [],
}
const reducerBuy = (state = initalseState, action) => {

    switch (action.type) {
        case "SET_BUY": {

            const buies = action.data
            return { ...state, buies }
        }
        case "EDIT_BUY": {

            const buies = [...state.buies];
            let index = buies.findIndex(x => x.Name === action.data.Name)
            if (index == -1) {
                buies.push(action.data);
            }
            else {
                if (action.data.Count == 0) {
                    buies.splice(index, 1)
                }
                else {
                    buies[index] = action.data
                }
            }
            return { ...state, buies }

        }
        case "DELETE_BUY": {

            const buies = [...state.buies];
            const findIndex = buies.findIndex(x => x.Name === action.data?.Name);
            buies.splice(findIndex, 1);
            return { ...state, buies }
        }

        default: return { ...state }
    }
}


export default reducerBuy;