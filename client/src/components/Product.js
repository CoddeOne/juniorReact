import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { client } from ".."
import { CHANGE_DATA } from "../Redusers/ActionCreator"
import { GET_ALL_PRODUCT } from "../Requests/Requests"
import { BsCartCheckFill } from "react-icons/bs"
class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0
        };
        this.handleSubmit = (e, data) => {

            e.preventDefault();

            this.setState(() => ({
                PDPSdata: data
            }))
            CHANGE_DATA(data)

        }
    }
    componentDidMount() {
        client.query({
            query: GET_ALL_PRODUCT

        }).then((result) => this.setState(() => ({
            data: result.data.category
        })))

    }

    currencyFilter() {
        const ArrayOfResults = []
        this.state?.data?.products[0]?.prices.filter((elem) => {
            const bool = elem.currency.symbol.charAt(0) === this.props.currency.currency.currency.charAt(0)
            const a = bool && this.state?.data?.products[0]?.prices.indexOf(elem)
            ArrayOfResults.push(a)
            return {}
        })


        return !ArrayOfResults.filter((elem) => !!elem).length ? 0 : ArrayOfResults.filter((elem) => !!elem)
    }

    checkCart(name) {
        const a = this.props.cart?.shopping?.filter((item) => item.name === name)
        return a.length !== 0 && true
    }


    render() {
        return (
            <>


                {this.state?.data?.products && this.state.data.products.filter((elem) => {
                    return this.props.tab.tab.current === "all" ? elem : this.props.tab.tab.current === elem.category
                }).map((elem, index) => {
                    return (

                        <div className="product"

                            key={index}
                            style={!elem.inStock ? { opacity: 0.5 } : {}}
                            onClick={(e) => this.handleSubmit(e, elem)}
                        >
                            <img src={elem.gallery[0]} alt="elem" />
                            {this.checkCart(elem.name) && <BsCartCheckFill className="cartCheck" />}
                            <h5>{elem.brand + " " + elem.name}</h5>

                            <h5>{elem.prices[this.currencyFilter()]?.currency.symbol} {elem.prices[this.currencyFilter()]?.amount}</h5>


                        </div>

                    )
                })}

                {this.state.PDPSdata && <Navigate to={`/PDP`} replace />}
            </>
        )

    }
}
const mapStateToProps = (state) => {

    return {
        currency: state,
        tab: state,
        cart: state.cart
    }
}
export default connect(mapStateToProps)(Product)