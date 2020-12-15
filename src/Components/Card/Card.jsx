import React from 'react';
import './card.css';

const Card = (props) => {
    const { src, description, title } = props;
    return (
        <div className="Card">
            <img className="Card-img" src={src} alt={title}/>
            <h3>{title}</h3>
            <p className="Card-paragraph">{description}</p>
        </div>
    )
}

export default Card;