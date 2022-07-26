const initialState = {
    shopping: [],
    sum: [],
    first: [],
    quantity: 0,
}

const CartReduser = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_TO_CART":

            return { ...state, shopping: [...state.shopping, action.payload], quantity: state.quantity + 1 }
        case "SUM_OF_MONEY":

            return {
                ...state, sum: [...state.sum.filter((elem) => { return elem.index !== action.payload.index }), action.payload]
            }
        case "FIRST_ADD":
            return { ...state, first: [...state.first, action.payload] }
        case "QUANTITY":
            return { ...state, quantity: state.quantity + action.payload }
        case "REMOVE":
            return { ...state, shopping: [...state.shopping.filter((elem) => elem.name !== action.payload.elem.name)], first: [...state.first, action.payload.quantity] }
        default:
            return state
    }

}


export default CartReduser