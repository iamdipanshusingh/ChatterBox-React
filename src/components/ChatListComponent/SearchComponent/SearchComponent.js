import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './SearchComponent.module.scss';

const SearchComponent = props => {
    return (
        <div className={classes.SearchComponentWrapper}>
            <form onSubmit={props.onSearch}>
                <input type="text" placeholder="Search" onChange={props.onChange} value={props.value} />
                {props.value ? <FontAwesomeIcon className={classes.Icon} icon={faTimes} /> : null}
            </form>
        </div>
    );
}

export default SearchComponent;
