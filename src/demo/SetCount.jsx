import React from 'react';
import { connect } from 'react-redux';


const SetCount = (props) => {
    return (
        <>
            <button onClick={props.onChangePlus}>Plus</button>
            <button onClick={props.onChangeMinus}>Minus</button>
        </>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangePlus: () => {
            dispatch({ type: 'COUNT_PLUS' });
        },
        onChangeMinus: () => {
            dispatch({ type: 'COUNT_MINUS' });
        }
        
    }
}

export default connect(null, mapDispatchToProps)(SetCount);


