import React from 'react';

import classes from './Layout.module.css';
import { Search, List } from '../index';

const Layout: React.FC = () => {

    return (
        <>
            <section className={classes['search-container']}>
                <Search />
            </section>
            <section className={classes['list-items-container']}>
                <List />
            </section>
        </>
    );
};

export default Layout;
