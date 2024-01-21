
const initalseState = {
    user: null,
}

const reducer = (state = initalseState, action) => {

    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.user}
        default: return { ...state }
    }
}

export default reducer;