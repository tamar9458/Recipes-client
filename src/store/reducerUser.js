import * as Actions from './action'

const initalseState = {
    user: null,
}

const reducer = (state = initalseState, action) => {
    console.log("submit 3",action.user);

    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.user}
        default: return { ...state }
    }
}


// reducer({ type: "ADD", payload: "dvora", data: "lll" })

export default reducer;