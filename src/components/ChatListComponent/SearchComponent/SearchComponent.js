import classes from './SearchComponent.module.scss';

const searchComponent = props => {
    return (
        <div className={classes.SearchComponentWrapper}>
            <input type="text" placeholder="Search"/>
        </div>
    );
}

export default searchComponent;
