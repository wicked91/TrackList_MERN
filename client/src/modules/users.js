import { handleActions, createAction } from 'redux-actions';

const USER_INFO = 'USER_INFO';
export const createUser = createAction(USER_INFO);

const initialState = {
    nickname: '',
    age:'',
    gender:'',
};

export default handleActions({
    [USER_INFO]: (state, action) =>{
        const {nickname, age, gender} = action.payload
        return {
            ...state,
            nickname,
            age,
            gender
        }
    } 
}, initialState);