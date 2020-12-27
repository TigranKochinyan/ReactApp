import React, { Component } from 'react';
import './price.css'

class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: this.props.price
        };
    };
    changeCurrency = () => {
        const diff = 500;//diff -- 1$ === 500Դ
        let {price} = this.state;
        let priceNum = parseFloat(price);
        if (price.includes('$')) {
            price = `${priceNum*diff}֏`;
        }
        else{
            price = `${priceNum/diff}$`;
        }
        this.setState({
            price: price,
        });
    };
    render() {
        const {price} = this.state;
        return(
            <>
                <small>price: {price}</small>
                <button onClick={this.changeCurrency}>Change currancy</button>
            </>
        )
    }
}

export default Price;