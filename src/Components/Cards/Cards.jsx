import React from 'react';
import './cards.css';
import Card from './../Card';

const data = [
    {
        title: 'Amazon',
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.", 
        src: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
        title: 'Iceland',
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.", 
        src: "https://images.pexels.com/photos/2331569/pexels-photo-2331569.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
        title: 'New Zeland',
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.", 
        src: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
];//or import data from json

const Cards = () => {
    return (
        <div className="cards">
            <Card 
                title={data[0].title} 
                description={data[0].description} 
                src={data[0].src}
                />
            <Card 
                title={data[1].title} 
                description={data[1].description} 
                src={data[1].src}
                />
            <Card 
                title={data[2].title} 
                description={data[2].description} 
                src={data[2].src}
                />
        </div>
    )
}

export default Cards;