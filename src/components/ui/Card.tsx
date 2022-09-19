import React from 'react';

import classes from './Card.module.css';

type Props = {
    image: string;
    title: string;
    className: string;
};

const Card: React.FC<Props> = ({ image, title, className }) => (
    <article className={className}>
        <img className={classes.image} src={image} alt={`image for ${title}`} />
        <h3 className={classes.title}>{title}</h3>
    </article>
);

export default Card;
