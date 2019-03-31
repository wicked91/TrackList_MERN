import { handleActions, createAction } from 'redux-actions';

const NICKNAME = 'NICKNAME';
const AGE = 'AGE';
const GENDER = 'GENDER';
const SHOPNAME = 'SHOPNAME';
const SHOPID = 'SHOPID';

export const nickname = createAction(NICKNAME);
export const age = createAction(AGE);
export const gender = createAction(GENDER);
export const shopname = createAction(SHOPNAME);
export const shopid = createAction(SHOPID);

const initialState = {
    nickname: '',
    age:'',
    gender:'',
    shopname:'',
    shopid:""
};

export default handleActions({
    [NICKNAME]: (state, action) =>{
        return {
            ...state,
            nickname:action.payload
        }
    } ,
    [AGE]: (state, action) =>{
        return {
            ...state,
            age:action.payload
        }
    } ,
    [GENDER]: (state, action) =>{
        return {
            ...state,
            gender:action.payload
        }
    } ,
    [SHOPNAME]: (state, action) =>{
        return {
            ...state,
            shopname:action.payload
        }
    }, 
    [SHOPID]: (state, action) =>{
        return {
            ...state,
            shopid:action.payload
        }
    }
}, initialState);