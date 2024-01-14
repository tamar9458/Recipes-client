import * as Actions from './action'

const initalseState = {
    categories: [],
}

const reducer = (state = initalseState, action) => {
    console.log("reducer cats",action.data);
    switch (action.type) {
        case "SET_CATEGORY":{
            const cats=action.data;
            return { ...state, categories:cats}
        }
        case "ADD_CATEGORY":{
            const cats = [...state.categories];
            cats.push(action.data);
            return { ...state, cats }}
        default: return { ...state }
    }
}


// reducer({ type: "ADD", payload: "dvora", data: "lll" })

export default reducer;