import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import classes from './SearchComponent.module.scss';

const SearchComponent = props => {
    const inputRef = useRef();

    const {onClear} = props

    useEffect(() => {
        const onEscape = (e) => {
            if (e.key === 'Escape') {
                inputRef.current.blur();

                onClear();
            }
        }

        window.addEventListener('keydown', onEscape);
        return (() => window.removeEventListener('keydown', onEscape));
    }, [onClear]);

    return (
        <div className={classes.SearchComponentWrapper}>
            <form onSubmit={props.onSearch}>
                <input ref={inputRef} type="text" placeholder="Search" onChange={props.onChange} value={props.value} />
                {props.value ? <FontAwesomeIcon onClick={props.onClear} className={classes.Icon} icon={faTimes} /> : null}
            </form>
        </div>
    );
}

export default SearchComponent;
