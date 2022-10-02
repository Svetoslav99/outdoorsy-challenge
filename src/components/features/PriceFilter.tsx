import classes from './PriceFilter.module.css';

type Props = {
    onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PriceFilter: React.FC<Props> = ({ onMinPriceChange, onMaxPriceChange }) => {
    return (
        <div className={classes.container}>
            <label htmlFor='min_price'>Min price</label>
            <input type='number' id='min_price' className={classes.price_filter_input} onChange={onMinPriceChange} />
            <label htmlFor='max_price'>Max price</label>
            <input type='number' id='max_price' className={classes.price_filter_input} onChange={onMaxPriceChange} />
        </div>
    );
};

export default PriceFilter;
