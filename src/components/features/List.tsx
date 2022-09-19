import classes from './List.module.css';
import { Card } from '../index';
import { List as ListProps } from '../../utils/types';

type Props = {
    list: ListProps[];
    error: string;
    isLoading: boolean;
};

const List: React.FC<Props> = ({ list, error, isLoading }) => {
    if (error) {
        return <h3 className={classes.error}>{error}</h3>;
    }

    if (isLoading) {
        return <h3>Loading...</h3>;
    }

    return (
        <>
            {list.map((item, index) => (
                <Card
                    key={`${item.title}_${index}`}
                    className={classes.article}
                    image={item.image}
                    title={item.title}
                />
            ))}
        </>
    );
};

export default List;
