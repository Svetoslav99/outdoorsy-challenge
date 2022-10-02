import classes from './ListItemsOrder.module.css';

type Props = {
    sortItemsAsc: boolean;
    sortItemsDesc: boolean;
    onSortItemsAscOrder: (e: React.MouseEvent) => void;
    onSortItemsDescOrder: (e: React.MouseEvent) => void;
};

const ListItemsOrder: React.FC<Props> = ({
    sortItemsAsc,
    sortItemsDesc,
    onSortItemsAscOrder,
    onSortItemsDescOrder
}) => {
    return (
        <div className={classes.container}>
            <button type='button' className={sortItemsAsc ? classes.active : ''} onClick={onSortItemsAscOrder}>
                Sort asc. order
            </button>
            <button type='button' className={sortItemsDesc ? classes.active : ''} onClick={onSortItemsDescOrder}>
                Sort desc. order
            </button>
        </div>
    );
};

export default ListItemsOrder;
