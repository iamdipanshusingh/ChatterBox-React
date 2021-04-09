import * as actionTypes from './actions';

const initialState = {
    users: [],
    selectedChat: {},
    chats: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS_LIST:
            return {
                ...state,
                users: action.users,
            };

        case actionTypes.SELECT_CHAT:
            return {
                ...state,
                selectedChat: action.selectedChat
            }

        case actionTypes.SET_CHATS:
            return {
                ...state,
                chats: [...action.chats]
            }
        default:
            return state;
    }
};

export default reducer;
