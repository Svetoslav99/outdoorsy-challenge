import React, { useState } from 'react';

import classes from './Search.module.css';

const Search: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={classes.container}>
            <label className={classes.label}>Search: </label>
            <input className={classes.input} value={inputValue} type='text' onChange={inputChangeHandler} />
        </div>
    );
};

export default Search;
