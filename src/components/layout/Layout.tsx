import React, { useState } from 'react';

import classes from './Layout.module.css';
import { Search, List } from '../index';
import { List as ListProps } from '../../utils/types';

const Layout: React.FC = () => {
    const [list, setList] = useState<ListProps[]>([]);
    const [error, setError] = useState('');

    return (
        <>
            <section className={classes['search-container']}>
                <Search setList={setList} setError={setError} />
            </section>
            <section className={classes['list-items-container']}>
                <List  list={list} error={error}/>
            </section>
        </>
    );
};

export default Layout;
