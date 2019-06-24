import { LOADER } from '../actions/actionTypes';

const initialState = {
    loading: false
};

export const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADER:
            return {
                ...state,
                loading: action.loading
            };
        default:
            return state;
    }
};