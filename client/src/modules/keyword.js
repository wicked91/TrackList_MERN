import { handleActions, createAction } from 'redux-actions';

const SEARCH = 'SEARCH';

export const search = createAction(SEARCH);

const initialState = {
    title: ''
};

export default handleActions({
    [SEARCH]: (state, action) =>{
        return {
            ...state,
            title : action.payload
        }
    } 
}, initialState);