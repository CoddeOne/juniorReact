import { useNavigate } from "react-router-dom"
import { store } from ".."

export const CurrentCurrency = props => {

    store.dispatch({
        type: "CURRENCYCHANGE",
        payload: props
    }
    )
}
export const CurrentTab = props => {
    store.dispatch({
        type: "CHANGE_TAB",
        payload: props
    })
}
export const CHANGE_DATA = props => {
    store.dispatch({
        type: "CHANGE_DATA",
        payload: props
    })
}
export const ADD_TO_CART = props => {

    store.dispatch({
        type: "ADD_TO_CART",
        payload: props
    })
}
export const sumOfMoney = props => {
    store.dispatch({
        type: "SUM_OF_MONEY",
        payload: props
    })
}
export const FIRST_ADD = props => {
    store.dispatch({
        type: "FIRST_ADD",
        payload: props
    })
}
export const QUANTITY = props => {
    store.dispatch({
        type: 'QUANTITY',
        payload: props
    })
}
export const REMOVE = props => {
    console.log(props)
    store.dispatch({
        type: "REMOVE",
        payload: props
    })
}