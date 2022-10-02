import React, { useState } from 'react';

import classes from './Layout.module.css';
import { Search, List } from '../index';
import { List as ListProps } from '../../utils/types';

const Layout: React.FC = () => {
    const [list, setList] = useState<ListProps[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [itemsCount, setItemsCount] = useState(0);

    return (
        <>
            <section className={classes['filter-container']}>
                <Search
                    setList={setList}
                    setError={setError}
                    setIsLoading={setIsLoading}
                    setItemsCount={setItemsCount}
                />
            </section>
            <section className={classes['list-items-container']}>
                <List list={list} error={error} isLoading={isLoading} itemsCount={itemsCount} />
            </section>
        </>
    );
};

export default Layout;
