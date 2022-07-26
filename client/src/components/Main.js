
import React from "react"
import { store } from ".."

import NavBar from "./NavBar"
import Product from "./Product"
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = null
    }

    render() {
        return (
            <NavBar>
                <div className="main">
                    <Product />
                </div>
            </NavBar>
        )
    }
}

export default Main