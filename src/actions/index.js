import { CLICK_UPDATE_VALUE, LOAD_NOTIFICATIONS, LOADER } from './actionTypes';
import { Api as api } from '../services';

export const loader = value => ({
    type: LOADER,
    loading: value
});

export const clickButton = value => ({
    type: CLICK_UPDATE_VALUE,
    newValue: value
});

export const loadNotifications = () => {
    return (dispatch) => {
        return api.getUnratedSeries().then((response) => {
            dispatch(setNotifications(response.data.docs));
        })
    }
};

const setNotifications = value => ({
    type: LOAD_NOTIFICATIONS,
    notifications: value
});