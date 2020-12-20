import React, { Component } from 'react';
import './name.css'

class Name extends Component {
    render() {
        const { name } = this.props;
        return(
            <p>{name}</p>
        )
    }
}

export default Name;