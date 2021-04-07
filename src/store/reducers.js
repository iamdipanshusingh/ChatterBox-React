import * as actionTypes from './actions';

const initialState = {
    users: [],
    selectedUser: {},
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
    }

    return state;
};

export default reducer;