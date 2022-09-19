import React, { useState, useEffect } from 'react';

import classes from './Search.module.css';

const Search: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`https://search.outdoorsy.com/rentals?filter[keywords]=${inputValue}`);

                if (!res.ok) {
                    throw new Error('Something went wrong!');
                }

                const data = await res.json();

                console.log('data: ', data);
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                console.log(message);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [inputValue]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={classes.container}>
            <label className={classes.label}>Search: </label>
            <input
                className={classes.input}
                value={inputValue}
                type='text'
                onChange={inputChangeHandler}
                list='filter-types'
                placeholder='trailer'
            />

            <datalist id='filter-types'>
                <option value='trailer' />
                <option value='fifth-wheel' />
                <option value='camper-van' />
            </datalist>
        </div>
    );
};

export default Search;
