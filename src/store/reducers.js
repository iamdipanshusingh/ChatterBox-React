import * as actionTypes from './actions';

const initialState = {
    users: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS_LIST:
            return {
                ...state,
                users: action.users,
            };
    }

    return state;
};

export default reducer;