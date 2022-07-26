import { connect } from "react-redux"
import NavBar from "./NavBar"
import React from "react"
import CartImage from "./CartImage"
import Total from "./Total"
class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0
        }
    }

    render() {
        return (
            <NavBar>
                <div className="goodsHolder">
                    {this.props.cart.shopping.map((elem, index) => {
                        return (
                            <div className="itemHolder" key={index}>
                                <div className="infoHolder">
                                    <h3>{elem.brand}</h3>
                                    <h4>{elem.name}</h4>
                                    {elem.attributes?.map((item, ind) => {
                                        return (
                                            <div className="optionsHolder" key={ind}>
                                                <h5>{item.name}:</h5>
                                                {item.items.map((opt, i) => {
                                                    return (
                                                        <div key={i} className={elem.options[ind]?.displayValue === opt.displayValue ?
                                                            item.name === "Color" && elem.options[ind] === opt ? "colorBorder" : "sizeBox activeOption" : "sizeBox"}
                                                            style={{ background: opt.displayValue }}
                                                        >

                                                            <h3 >{item.name !== "Color" && opt.value}</h3>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )

                                    })}
                                    {elem.prices?.map((item) => {
                                        return item.currency?.symbol.charAt(0) === this.props.currency.currency.charAt(0)
                                            && <h5 key={index}>{this.props.currency.currency.charAt(0) + " " + item.amount}</h5>

                                    })}
                                </div>
                                <CartImage elem={elem} key={index} index={index} />
                            </div>
                        )
                    })}
                    <Total />
                </div>
            </NavBar>
        )
    }

}


const mapStateToProps = (state) => {

    return {
        cart: state.cart,
        currency: state.currency,
    }
}
export default connect(mapStateToProps)(Cart)