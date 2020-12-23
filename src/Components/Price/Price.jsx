import React, { Component } from 'react';
import './price.css'

class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: this.props.price,
            currency: this.props.currency
        };
    };
    changeCurrency = () => {
        const diff = 500;//diff -- 1$ === 500Դ
        const {price, currency} = this.state;

        if (currency === '$') {
            this.setState({
                price: price*diff,
                currency: 'դրամ'
            });
        }
        else{
            this.setState({
                price: price*1/diff,
                currency: '$'
            });
        }
    };
    render() {
        const {price, currency} = this.state;
        return(
            <>
                <small>price: {price} {currency}</small>
                <button onClick={this.changeCurrency}>Change currancy</button>
            </>
        )
    }
}

export default Price;