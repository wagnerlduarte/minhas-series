import { LOAD_NOTIFICATIONS } from '../actions/actionTypes';

const initialState = {
    notifications: []
};

export const loadNotificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications
            };
        default:
            return state;
    }
};