
import React, { createRef } from "react"
import { GET_CATEGORIES, GET_CURRENCiES } from "../Requests/Requests"
import { client } from "../index"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, Navigate } from "react-router-dom"
import { BsFillBagCheckFill } from "react-icons/bs"
import { CurrentCurrency, CurrentTab } from "../Redusers/ActionCreator"

import { connect } from "react-redux"
import MiniCart from "./MiniCart"

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = null
        this.ref = createRef()

    }


    componentDidMount() {
        client.query({
            query: GET_CATEGORIES

        }).then((result) => this.setState(() => ({
            data: result.data.categories
        })))
        client.query({
            query: GET_CURRENCiES

        }).then((result) => this.setState(() => ({
            currencies: result.data.currencies
        })))
            .then(() => this.setState(() => ({
                mminiCart: false
            })))
    }
    openMiniCart() {
        this.setState(() => ({
            miniCart: !this?.state?.miniCart
        }))
    }



    render() {

        return (
            <div className="Main_root">
                <div className="NavBar">
                    <div className="category">
                        <Link to="/" className={this.state?.data[0]?.name === this.props.tab.tab.current ? "Link active" : "Link"} onClick={(e) => CurrentTab(this.state?.data[0]?.name)}>{this.state && this.state?.data[0]?.name}</Link>
                        <Link to="/" className={this.state?.data[1]?.name === this.props.tab.tab.current ? "Link active" : "Link"} onClick={(e) => CurrentTab(this.state?.data[1]?.name)}>{this.state && this.state?.data[1]?.name}</Link>
                        <Link to="/" className={this.state?.data[2]?.name === this.props.tab.tab.current ? "Link active" : "Link"} onClick={(e) => CurrentTab(this.state?.data[2]?.name)}>{this.state && this.state?.data[2]?.name}</Link>
                    </div>
                    <BsFillBagCheckFill className="bag" size={30} onClick={() => this.setState(() => ({
                        clicked: true
                    }))} />
                    {this.state?.clicked && <Navigate to="/cart" replace />}
                    <div className="cur">
                        <select className="select" ref={this.ref} onChange={(e) => CurrentCurrency(e.target.value)} >

                            {this.state?.currencies && this.state.currencies.map((elem, index) => {
                                return (
                                    <option key={index}>{elem.symbol + " " + elem.label}</option>
                                )
                            })}
                        </select>


                        <>

                            <AiOutlineShoppingCart onClick={() => this.openMiniCart()} />
                            {this.state?.miniCart && <MiniCart />}
                            <h6 className="amountOfPurchases">{this.props.cart.quantity}</h6>
                        </>
                    </div>

                </div>

                <div>
                    {this.props.children}
                </div>
            </div>

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

export default connect(mapStateToProps)(NavBar)