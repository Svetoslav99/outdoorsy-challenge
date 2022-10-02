import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';

import classes from './List.module.css';
import { Card } from '../index';
import { List as ListProps } from '../../utils/types';

type Props = {
    list: ListProps[];
    error: string;
    isLoading: boolean;
    itemsCount: number;
};

const List: React.FC<Props> = ({ list, error, isLoading, itemsCount }) => {
    if (error) {
        return <h3 className={classes.error}>{error}</h3>;
    }

    if (isLoading) {
        return <h3>Loading...</h3>;
    }
    const itemsPerPage = 4;
    const pageCount = Math.ceil(itemsCount / itemsPerPage);
    const [currentItems, setCurrentItems] = useState<ListProps[]>([]);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(list.slice(itemOffset, endOffset));
    }, [itemOffset]);

    const handlePageClick = (e: { selected: number }) => {
        console.log('e: ', e);
        const newOffset = (e.selected * itemsPerPage) % list.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {currentItems.map((item, index) => (
                <Card
                    key={`${item.title}_${index}`}
                    className={classes.article}
                    image={item.image}
                    title={item.title}
                    vehicleType={item.vehicleType}
                    pricePerDay={item.pricePerDay}
                    presentmentCurr={item.presentmentCurr}
                />
            ))}

            {list.length !== 0 && (
                <ReactPaginate
                    breakLabel='...'
                    nextLabel='next >'
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    previousLabel='< previous'
                    className={classes.paginate_container}
                    activeClassName='active'
                />
            )}
        </>
    );
};

export default List;
