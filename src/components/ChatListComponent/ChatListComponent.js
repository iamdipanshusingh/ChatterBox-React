import classes from './ChatListComponent.module.scss';
import SearchComponent from './SearchComponent/SearchComponent';
import Divider from '@material-ui/core/Divider';
import ChatListData from './ChatListData/ChatListData';

const chatListComponent = props => {
    // dummy data - fetch these from firestore
    const data = [
        {
            name: 'Dipanshu',
            message: 'hello'
        },
        {
            name: 'Dipanshu',
            message: 'hello'
        },
        {
            name: 'Dipanshu',
            message: 'hello'
        },
        {
            name: 'Dipanshu',
            message: 'hello'
        },
        {
            name: 'Dipanshu',
            message: 'hello'
        },
        {
            name: 'Dipanshu',
            message: 'hello'
        },
        {
            name: 'Dipanshu',
            message: 'hello'
        },
        {
            name: 'Dipanshu',
            message: 'hello'
        }
    ];

    let chatDataComponent = null;

    if (data) {
        chatDataComponent = data.map(message =>
            <div className={classes.ChatWrapper}>
                <ChatListData message={message} />
                <Divider variant='middle' />
            </div>
        );
    }

    return (
        <div className={classes.ChatListWrapper}>
            <SearchComponent />
            <Divider variant='middle' />

            {chatDataComponent}
        </div>
    );
}

export default chatListComponent;
