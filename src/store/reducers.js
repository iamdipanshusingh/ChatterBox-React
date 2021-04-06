import * as actionTypes from './actions';

const initialState = {
    users: [],
    selectedUser: {},
    currentUser: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS_LIST:
            return {
                ...state,
                users: action.users,
            };

        case actionTypes.SET_SELECTED_USER:
            return {
                ...state,
                selectedUser: action.selectedUser
            }

        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
    }

    return state;
};

export default reducer;