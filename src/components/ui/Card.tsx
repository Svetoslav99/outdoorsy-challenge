import React from 'react';

import classes from './Card.module.css';

type Props = {
    image: string;
    title: string;
};

const Card: React.FC<Props> = ({ image, title }) => (
    <article>
        <img src={image} alt={`image for ${title}`} />
        <h3>{title}</h3>
    </article>
);

export default Card;
