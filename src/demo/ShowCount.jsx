import React from 'react';
import { connect } from 'react-redux';

const ShowCount = (props) => {
    return (
        <>
            <h2>{props.value}</h2>
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        value: state.count
    }
}

export default connect(mapStateToProps)(ShowCount);


