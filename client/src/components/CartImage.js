import React from "react"
import { GrFormNext } from "react-icons/gr"
import { GrFormPrevious } from "react-icons/gr"
import { BsPlusSquareFill } from "react-icons/bs"
import { BsFileMinusFill } from "react-icons/bs"
import { connect } from "react-redux"
import { FIRST_ADD, QUANTITY, REMOVE, sumOfMoney } from "../Redusers/ActionCreator"
class CartImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0,
            amountOf: 1,
        }
    }
    componentDidMount() {
        this.props.elem.prices?.map((item) => (
            item.currency?.symbol.charAt(0) === this.props.currency.currency.charAt(0)
            && this.setState(() => ({ itemAmount: item.amount }))
        ))
        !!this.props.cart.sum.length && this.props.cart.sum.map((elem, index) => (
            elem.index === this.props.index && this.setState(() => ({ amountOf: elem.quantity }))
        ))
    }
    componentWillUnmount() {
        sumOfMoney({ quantity: this.state.amountOf, index: this.props.index })
    }
    nextImg() {
        if (this.state.active >= this.props.elem?.gallery?.length - 1) {
            this.setState(() => ({ active: 0 }))
        }

        else {
            this.setState(() => ({ active: this.state.active + 1 }))
        }
    }

    prevImg() {
        if (this.state.active < 1) {

            this.setState(() => ({
                active: this.props.elem?.gallery?.length - 1
            }))
        }

        else { this.setState(() => ({ active: this.state.active - 1 })) }
    }

    nextAmountof() {
        QUANTITY(1)
        FIRST_ADD(this.state?.itemAmount)
        this.setState(() => ({ amountOf: this.state.amountOf + 1 }))


    }

    prevAmoutOf() {
        if (this.state.amountOf <= 1) {
            console.log(this.props)
            REMOVE({ elem: this.props.elem, quantity: -this.state?.itemAmount })
            console.log(this.state.itemAmount)
            QUANTITY((-1))
        }

        else {
            QUANTITY((-1))
            FIRST_ADD(-this.state?.itemAmount)
            this.setState(() => ({ amountOf: this.state.amountOf - 1 }))

        }
    }


    render() {
        return (
            <div className="amountHolder" >
                <button className="amountBtn amountPlus " onClick={() => this.nextAmountof()}><BsPlusSquareFill size={25} /></button>
                <h3 className="numberOf">{this.state.amountOf}</h3>
                <button className="amountBtn amountMinus" onClick={() => this.prevAmoutOf()}><BsFileMinusFill size={27} /></button>

                {this.props.elem.gallery?.map((elem, i) => {
                    return (
                        <>
                            <img src={elem}
                                className={i === this.state.active ? "curImg cartImages" : "cartImages"}
                                key={i}
                                alt="cartImage"
                            />
                        </>
                    )
                })}

                <button className="btn next" onClick={() => this.nextImg()}><GrFormNext size={20} /></button>
                <button className="btn prev" onClick={() => this.prevImg()}><GrFormPrevious size={20} /></button>
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

export default connect(mapStateToProps)(CartImage)