import ChatRoom from '../../components/ChatRoom/ChatRoom';
import ChatListComponent from '../../components/ChatListComponent/ChatListComponent';
import classes from './ChatRoomContainer.module.scss';
import { useState, useEffect } from 'react';

function ChatRoomContainer(props) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const resizeEventListener = () => {
            const width = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

            setWidth(width);
        }

        resizeEventListener();

        window.addEventListener('resize', resizeEventListener);

        return () => {
            window.removeEventListener('resize', resizeEventListener);
        }
    }, []);

    return (
        <div className={classes.ChatRoomContainerWrapper}>
            {width > 900 && <ChatListComponent />}
            <ChatRoom />
        </div>
    );
}

export default ChatRoomContainer;