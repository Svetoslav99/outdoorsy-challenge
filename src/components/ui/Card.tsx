import React from 'react';

import classes from './Card.module.css';

type Props = {
    image: string;
    title: string;
    className: string;
    vehicleType: string;
    pricePerDay: number;
    presentmentCurr: string;
};

const Card: React.FC<Props> = ({ image, title, className, vehicleType, pricePerDay, presentmentCurr }) => (
    <article className={className}>
        <img className={classes.image} src={image} alt={`image for ${title}`} />
        <h3 className={classes.title}>{title}</h3>
        <p>{vehicleType}</p>
        <p>
            {pricePerDay} | {presentmentCurr}
        </p>
    </article>
);

export default Card;
