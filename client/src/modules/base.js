import {handleActions, createAction} from 'redux-actions';

const SET_MODAL = 'SET_MODAL';

export const setModal = createAction(SET_MODAL);

const initialState = {
    modal : false
};

export default handleActions({
    [SET_MODAL]: (state, action) =>{
        return {
            ...state,
            modal:action.payload
        }
    }
},initialState);