import React, { useState, useEffect } from 'react';

import classes from './Search.module.css';
import { List } from '../../utils/types';
import { PriceFilter, ListItemsOrder } from '../index';

type Props = {
    setList: React.Dispatch<React.SetStateAction<List[]>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setItemsCount: React.Dispatch<React.SetStateAction<number>>;
};

const Search: React.FC<Props> = ({ setList, setError, setIsLoading, setItemsCount }) => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const [minPriceInputValue, setMinPriceInputValue] = useState(0);
    const [maxPriceInputValue, setMaxPriceInputValue] = useState(0);
    const [sortItemsAsc, setSortItemsAsc] = useState(false);
    const [sortItemsDesc, setSortItemsDesc] = useState(false);

    useEffect(() => {
        const timeout = sortItemsAsc || sortItemsDesc ? 300 : 500;

        const timer = setTimeout(async () => {
            if (!searchInputValue) {
                setList([]);
                return;
            }

            try {
                setIsLoading(true);
                const res = await fetch(`https://search.outdoorsy.com/rentals?filter[keywords]=${searchInputValue}`);

                if (!res.ok) {
                    throw new Error('Something went wrong!');
                }

                const parsedData = await res.json();

                const formattedData: List[] = [];

                parsedData.data.forEach((item: any) => {
                    const rentalName: string = item.attributes.name;
                    const rentalImgRelation = parsedData.included.find(
                        (rentalImg: any) => item.relationships.primary_image.data.id === rentalImg.id
                    );
                    const rentalImgUrl: string = rentalImgRelation?.attributes.url;
                    const vehicleType: string = item.attributes.display_vehicle_type;
                    const pricePerDay: number = item.attributes.price_per_day; // price in cents
                    const pricePerDayFormatted = pricePerDay / 100;
                    const presentmentCurr: string = item.attributes.presentment_currency;

                    const dataObj = {
                        image: rentalImgUrl,
                        title: rentalName,
                        vehicleType: vehicleType,
                        pricePerDay: pricePerDayFormatted,
                        presentmentCurr: presentmentCurr
                    };

                    if (minPriceInputValue !== 0 && maxPriceInputValue !== 0) {
                        if (pricePerDayFormatted >= minPriceInputValue && pricePerDayFormatted <= maxPriceInputValue) {
                            formattedData.push(dataObj);
                        }
                    } else if (minPriceInputValue !== 0 && maxPriceInputValue === 0) {
                        if (pricePerDayFormatted >= minPriceInputValue) {
                            formattedData.push(dataObj);
                        }
                    } else if (maxPriceInputValue !== 0 && minPriceInputValue === 0) {
                        if (pricePerDayFormatted <= maxPriceInputValue) {
                            formattedData.push(dataObj);
                        }
                    } else if (maxPriceInputValue === 0 && minPriceInputValue === 0) {
                        formattedData.push(dataObj);
                    }
                });

                if (sortItemsAsc) formattedData.sort((a, b) => a.pricePerDay - b.pricePerDay);
                else if (sortItemsDesc) formattedData.sort((a, b) => b.pricePerDay - a.pricePerDay);

                setItemsCount(formattedData.length);
                setList(formattedData);
                setIsLoading(false);
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                setError(message);
                setIsLoading(false);
            }
        }, timeout);

        return () => clearTimeout(timer);
    }, [searchInputValue, minPriceInputValue, maxPriceInputValue, sortItemsAsc, sortItemsDesc]);

    const searchInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInputValue(e.target.value);
    };

    const minPriceInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPriceInputValue(+e.target.value);
    };

    const maxPriceInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPriceInputValue(+e.target.value);
    };

    const sortItemsAscHandler = (e: React.MouseEvent) => {
        setSortItemsAsc(true);

        if (sortItemsDesc) setSortItemsDesc(false);
    };

    const sortItemsDescHandler = (e: React.MouseEvent) => {
        setSortItemsDesc(true);

        if (sortItemsAsc) setSortItemsAsc(false);
    };

    return (
        <>
            <div className={classes.container}>
                <label className={classes.label}>Search: </label>
                <input
                    className={classes.input_search}
                    value={searchInputValue}
                    type='text'
                    onChange={searchInputChangeHandler}
                    list='filter-types'
                    placeholder='trailer'
                />

                <datalist id='filter-types'>
                    <option value='trailer' />
                    <option value='fifth-wheel' />
                    <option value='camper-van' />
                    <option value='a' label='Class A' />
                    <option value='b' label='Class B' />
                    <option value='c' label='Class C' />
                </datalist>
            </div>

            <PriceFilter onMinPriceChange={minPriceInputHandler} onMaxPriceChange={maxPriceInputHandler} />

            <ListItemsOrder
                sortItemsDesc={sortItemsDesc}
                sortItemsAsc={sortItemsAsc}
                onSortItemsAscOrder={sortItemsAscHandler}
                onSortItemsDescOrder={sortItemsDescHandler}
            />
        </>
    );
};

export default Search;
