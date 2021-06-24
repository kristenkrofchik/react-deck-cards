import React from 'react';

function Card({
    id, name, image
}) {
    return (
        <div>
            <img id={id} src={image} alt={name}/>
        </div>
    )
}

export default Card;