import { CLICK_UPDATE_VALUE, LOAD_NOTIFICATIONS } from './actionTypes';
import { Api as api } from '../services';

export const clickButton = value => ({
    type: CLICK_UPDATE_VALUE,
    newValue: value
});

export const loadNotifications = () => {
    return (dispatch) => {
        return api.getUnratedSeries().then((response) => {
            dispatch(setNotifications(response.data));
        })
    }
};

export const setNotifications = value => ({
    type: LOAD_NOTIFICATIONS,
    notifications: value
});