import { clickReducer } from './clickReducer';
import { loadNotificationsReducer } from './loadNotificationsReducer';

import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    clickState: clickReducer,
    loadNotifications: loadNotificationsReducer
});