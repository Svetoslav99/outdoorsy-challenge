import React, { useState, useEffect } from 'react';

import classes from './Search.module.css';
import { List } from '../../utils/types';

type Props = {
    setList: React.Dispatch<React.SetStateAction<List[]>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search: React.FC<Props> = ({ setList, setError, setIsLoading }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!inputValue) {
                setList([]);
                return;
            }

            try {
                setIsLoading(true);
                const res = await fetch(`https://search.outdoorsy.com/rentals?filter[keywords]=${inputValue}`);

                if (!res.ok) {
                    throw new Error('Something went wrong!');
                }

                const { data, included } = await res.json();

                const formattedData: List[] = [];

                data.forEach((item: any) => {
                    const rentalName: string = item.attributes.name;
                    const rentalImgRelation = included.find(
                        (rentalImg: any) => item.relationships.primary_image.data.id === rentalImg.id
                    );
                    const rentalImgUrl: string = rentalImgRelation?.attributes.url;

                    formattedData.push({ image: rentalImgUrl, title: rentalName });
                });

                setList(formattedData);
                setIsLoading(false);
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                setError(message);
                setIsLoading(false);
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
