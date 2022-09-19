import classes from './List.module.css';
import { Card } from '../index';
import { List as ListProps } from '../../utils/types';

type Props = {
    list: ListProps[];
    error: string;
    className: string;
};

const List: React.FC<Props> = ({ list, error }) => {
    if (error) {
        return <h3>{error}</h3>;
    }

    return (
        <>
            {list.map((item, index) => (
                <Card key={`${item.title}_${index}`} image={item.image} title={item.title} />
            ))}
        </>
    );
};

export default List;
