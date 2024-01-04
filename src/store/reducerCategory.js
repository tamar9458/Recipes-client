import * as Actions from './action'

const initalseState = {
    categories: [],
}

const reducer = (state = initalseState, action) => {
    switch (action.type) {
        case "ADD_CATEGORY":
            const cats = [...state.categories];
            console.log(cats)
            cats.push(action.data);
            console.log(action.data)
            return { ...state, cats }
        default: return { ...state }
    }
}


// reducer({ type: "ADD", payload: "dvora", data: "lll" })

export default reducer;