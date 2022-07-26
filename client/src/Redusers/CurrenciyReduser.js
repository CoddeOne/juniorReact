

const initialState = {
    currency: "$"
}

const CurrencyReduser = (state = initialState, action) => {

    switch (action.type) {
        case "CURRENCYCHANGE":

            return { ...state, currency: action.payload }

        default:
            return state
    }

}


export default CurrencyReduser