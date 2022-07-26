import React from "react";
import { connect } from "react-redux"
import { Navigate } from "react-router-dom";

import MiniCartImage from "./MiniCartImage";

class MiniCart extends React.Component {


    componentDidMount() {
        document.querySelector(".main")?.classList.add("pageOpasity")

    }
    componentWillUnmount() {
        document.querySelector(".main")?.classList.remove("pageOpasity")
    }



    render() {
        return (
            <div className="mimiCart">
                {!!this.props.cart.shopping.length ?
                    <div className="miniCartConteiner">
                        <h4>My Bag: {this.props.cart?.quantity} items</h4>
                        {this.props.cart.shopping.map((elem, index) => {
                            return (
                                <div className="miniCartItemHolder" key={index}>
                                    <div className="miniCartInfoHolder">
                                        <h3>{elem.brand}</h3>
                                        <h4>{elem.name}</h4>
                                        {elem.attributes?.map((item, ind) => {
                                            return (
                                                <div className="miniCartoptionsHolder">
                                                    <h5>{item.name}:</h5>
                                                    {item.items.map((opt, i) => {
                                                        return (
                                                            <div className={elem.options[ind]?.displayValue === opt.displayValue ?
                                                                item.name === "Color" && elem.options[ind] === opt ? "miniColorBorder" : "sizeBox activeOption" : "sizeBox"}
                                                                style={{ background: opt.displayValue }}
                                                            >
                                                                {console.log(elem.options)}
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
                                    <MiniCartImage elem={elem} key={index} index={index} />
                                </div>
                            )
                        })}
                        <div className="miniTotalHolder">
                            <h4 className="miniTotal">Total:</h4>
                            <h4 className="miniTotal"> {this.props.currency.currency}{!!this.props.cart.shopping.length && this.props.cart?.first.reduce((prev, cur) => {
                                return prev + cur
                            }).toFixed(2)}</h4>
                        </div>

                        <div className="miniViewOrOrderBtn">
                            <button className="view" onClick={() => this.setState(() => ({

                                viweBag: true
                            }))}>VIEW BAG</button>
                            {this.state?.viweBag && <Navigate to={"/cart"} replace />}
                            <button className="miniOrder">CHECK OUT</button>
                        </div>

                    </div>
                    : <h1 className="miniemptyCart">Cart is empty</h1>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {

    return {
        cart: state.cart,
        currency: state.currency,
    }
}
export default connect(mapStateToProps)(MiniCart)
