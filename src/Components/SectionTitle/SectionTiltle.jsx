import React, { memo } from 'react';
import PropTypes from 'prop-types';

const SectionTitle = (props) => {
    return (
        <h1>{props.title}</h1>
    )
}

SectionTitle.propTypes = {
    title: PropTypes.string.isRequired
}

export default memo(SectionTitle);