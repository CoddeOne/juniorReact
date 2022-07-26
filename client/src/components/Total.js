import React from "react"
import { connect } from "react-redux"
class Total extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {

    }


    render() {
        return (
            <>
                {!!this.props.cart.shopping.length ? <div className="total">
                    <h4>Tax 21%: {this.props.currency.currency}{!!this.props.cart.shopping.length && (this.props.cart?.first.reduce((prev, cur) => {
                        return prev + cur
                    }) / 100 * 21).toFixed(2)}</h4>
                    <h4>Quantity : {this.props.cart.quantity}</h4>
                    <h4>Total: {this.props.currency.currency} {!!this.props.cart.shopping.length && this.props.cart?.first.reduce((prev, cur) => {
                        return prev + cur
                    }).toFixed(2)}</h4>

                    <button className="orderButton">ORDER</button>
                </div>
                    : <h1 className="emptyCart">Cart is empty</h1>
                }
            </>
        )
    }
}
const mapStateToProps = (state) => {

    return {
        cart: state.cart,
        currency: state.currency,
    }
}
export default connect(mapStateToProps)(Total)