import {handleActions, createAction} from 'redux-actions';

const UPDATELIST = 'UPDATELIST';

export const updatelist = createAction('UPDATELIST');

const initialState = {
    tracklist :[]
}

export default handleActions({
    [UPDATELIST] : (state, action) => {
        return {
            ...state,
            tracklist:action.payload.data
        };
    }
},initialState);