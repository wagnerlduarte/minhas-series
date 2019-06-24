import { clickReducer } from './clickReducer';
import { loadNotificationsReducer } from './loadNotificationsReducer';
import { loaderReducer } from './loaderReducer';

import { combineReducers } from 'redux';

export const Reducers = combineReducers({
    clickState: clickReducer,
    loadNotifications: loadNotificationsReducer,
    loader: loaderReducer
});