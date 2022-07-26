import React from "react"
import NavBar from "./NavBar"
import { connect } from "react-redux"

import { GET_ID } from "../Requests/Requests"
import { client } from ".."
import { ADD_TO_CART, FIRST_ADD } from "../Redusers/ActionCreator"
import { Navigate } from "react-router-dom"
class PDP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentOptions: [],
            currentIndex: 0
        }
    }

    componentDidMount() {
        client.query({
            query: GET_ID,
            variables: {
                "productId": this.props.tab.tab.currentElement.id
            }

        }).then((result) => this.setState(() => ({
            data: result.data.product
        })))
    }
    descriptionReturner() {
        return (
            <div className="descriptionText" dangerouslySetInnerHTML={{ __html: this.state?.data?.description }}></div>
        );
    }
    arr = [];
    optionHandler(e, index, item) {
        this.arr[index] = item

        this.setState(() => ({
            currentOptions: this.arr
        }))
    }

    clickHandler() {
        if (this.arr.length !== this.state?.data?.attributes?.length) {
            alert("Choose all options")
        }
        else {

            this.state?.data?.prices.map((elem, index) => {
                return (
                    elem.currency?.symbol.charAt(0) === this.props.currency.currency.charAt(0)
                    && FIRST_ADD(elem.amount))
            })

            const obj = { ...this.state.data, options: this.arr }
            ADD_TO_CART(obj)
            this.setState(() => ({ clicked: true }))
        }
    }
    disableHandler() {
        return this.state?.data?.inStock ? false : true
    }
    render() {
        return (
            <NavBar>
                <div className="PDP">
                    <div className="imagesConteiner">
                        {this.state?.data?.gallery?.map((elem, index) => {
                            return (
                                <img key={index} src={elem}
                                    alt={"GoodImages"}
                                    className={index === this.state.currentIndex ? "activeImg" : "images"}
                                    onClick={() => this.setState(() => ({
                                        currentIndex: index
                                    }))}
                                />
                            )
                        })}

                    </div>
                    <div className="description">
                        <h1>{this.state?.data?.name}</h1>
                        <h2>{this.state?.data?.brand}</h2>
                        {this.state?.data?.attributes?.map((elem, index) => {
                            return (
                                <div key={index} className="atributeHolder">
                                    <h4 className="artName">{elem.id}:</h4>
                                    <div className="optionsHolder">
                                        {elem.items.map((item, i) => {
                                            return (<div
                                                className={this.arr[index] === item ? elem.name === "Color" && this.arr[index] === item ? "colorBorder" : "sizeBox activeOption" : "sizeBox"}
                                                style={{ background: item.displayValue }}
                                                onClick={(e) => this.optionHandler(e, index, item)}
                                                key={i}>

                                                <h3>{elem.name !== "Color" && item.value}</h3>
                                            </div>)
                                        })}
                                    </div>
                                </div>

                            )
                        })}
                        <h4>Price :</h4>
                        {this.state?.data?.prices.map((elem, index) => {
                            return (
                                elem.currency?.symbol.charAt(0) === this.props.currency.currency.charAt(0)
                                && <h5 key={index}>{this.props.currency.currency.charAt(0) + " " + elem.amount}</h5>)
                        })}
                        <button className="CartButton"
                            onClick={() => this.clickHandler()}
                            style={this.disableHandler() || this.arr.length !== this.state?.data?.attributes?.length ? { opacity: 0.5 } : {}}
                            disabled={this.disableHandler()}
                        >{this.disableHandler() ? "OUT OF STOCK" : "ADD TO CART"}</button>
                        {this.state?.clicked && <Navigate to={"/cart"} replace />}
                        {this.descriptionReturner()}
                    </div>
                </div>
            </NavBar>
        )
    }
}


const mapStateToProps = (state) => {

    return {
        currency: state.currency,
        tab: state,
    }
}
export default connect(mapStateToProps)(PDP)
