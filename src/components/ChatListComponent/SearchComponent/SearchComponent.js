import classes from './SearchComponent.module.scss';

const SearchComponent = props => {
    return (
        <div className={classes.SearchComponentWrapper}>
            <form onSubmit={props.onSearch}>
                <input type="text" placeholder="Search" onChange={props.onChange} />
            </form>
        </div>
    );
}

export default SearchComponent;
