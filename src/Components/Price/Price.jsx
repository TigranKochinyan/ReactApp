import React, { Component } from 'react';
import './price.css'

class Price extends Component {
    render() {
        const {price} = this.props; 
        return(
            <small>price: {price}$</small>
        )
    }
}

export default Price;