import classes from './ChatListComponent.module.scss';
import SearchComponent from './SearchComponent/SearchComponent';
import Divider from '@material-ui/core/Divider';

const chatListComponent = props => {
    return(
        <div className={classes.ChatListWrapper}>
            <SearchComponent/>
            <Divider variant='middle'/>
        </div>
    );
}

export default chatListComponent;
