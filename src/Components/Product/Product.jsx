import React, { Component } from 'react';
import './product.css';

import Price from './../Price';
import Name from './../Name';
import Description from './../Description';

class Product extends Component {
    render() {
        const { price, name, description } = this.props;
        return(
            <>
                <Name name={name} />
                <Price price={price} />
                <Description description={description} />
            </>
        )
    }
}

export default Product;