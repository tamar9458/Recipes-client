
const initalseState = {
    categories: [],
}

const reducer = (state = initalseState, action) => {

    switch (action.type) {
        case "SET_CATEGORY": {

            const cats = action.data
            return { ...state, categories: cats }
        }
        case "ADD_CATEGORY": {

            const cats = [...state.categories]
            cats.push(action.data)
            return { ...state, cats }
        }
        default: return { ...state }
    }
}

export default reducer;