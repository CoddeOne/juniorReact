
const initialState = {
    current: "all",
    currentElement: null
}

const CurrentTab = (state = initialState, action) => {

    switch (action.type) {
        case "CHANGE_TAB":

            return { ...state, current: action.payload }
        case "CHANGE_DATA":
            return { ...state, currentElement: action.payload }
        default:
            return state
    }

}


export default CurrentTab